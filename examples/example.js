/*
*IMPORTANT:
*    API is shared between GUI and the pure API, and acts as the backbone of the GUI part. However, in order to use the standalone API in a programming environment and run this demo,
*    this API directory has to be copied to another directory and re-run in the new directory "npm install" once again!
*/

//the following line MUST be the first statement!
process.env.TBCTMP = 'PAPER'; //set the environment variable TBCTMP to LIVE, if to trade on the live net

const MD = require('../market-data-feed');
const TD = require('../trade-on-chain');

let endpoint = process.env.TBCTMP === 'LIVE' ?
    'https://mainnet.infura.io/v3/ee07e33cb6414781a72deaf3b303ca3b' : // use Ethereum main net to live trade
    'https://ropsten.infura.io/v3/ee07e33cb6414781a72deaf3b303ca3b';  // use ropsten test-net to paper trade
let account = '0x'; // specify the account; different accounts in main net vs. test net
let keystore = '';  // specify the keystore file path
let tokenReceiver = ''; //address to be used as the beneficiary in the demo of token transfer
let password = process.env.PWD; //the password to the keystore file, provided by the environment variable of the O.S. for the security sake, if to use keystore to sign transactions
// let mnemoic = process.env.MNEMONIC; // the mnemonic to use to decrypt the account, if to use mnemonic to sign transactions
// let privateKey = process.env.PKEY; //the private key of the account, if to use private key to sign transactions

let toOrderMap = new Map(['600010.SS', '002083.SZ', '000300.SS', 'USD.CNY.FX', 'JPY.CNY.FX', 'EUR.CNY.FX', 'USD.JPY.FX', "IVX.SS", 'TBC.CNY.CRYPTO', 'ETH.USD.CRYPTO', 'BTC.JPY.CRYPTO', 'ETH.CNY.CRYPTO', 'BTC.EUR.CRYPTO', 'EOS.CNY.CRYPTO', 'TBC.USD.CRYPTO', 'BTC.TBC.CRYPTO', 'ETH.TBC.CRYPTO', 'EOS.TBC.CRYPTO', 'XMR.TBC.CRYPTO', 'XRP.TBC.CRYPTO', 'BCH.TBC.CRYPTO', 'LTC.TBC.CRYPTO']
                    .map(m => [m, false]));
let stage = 0;

TD.newInstance({endpoint, account}).then( async td => {
    console.log(`balance of token: ${await td.token_balance()}`);
    let all_queried =
        await td
        // .with_from_block_num(45000000) //start block number, from which on query will be done, default value is the start block number of the smart contract
        .query_all(account, true);  //the second argument is whether to query the latest prices of positions to get the market values of holdings

    //query all relevant data from the chain
    console.log(`the smart contract is up: ${all_queried.pause.paused ? 'no' : 'yes'}`);
    console.log(`market value of all positions: ${all_queried.portfolio.marketValue}`);
    console.log(`liquidation value: ${all_queried.portfolio.marketValue + all_queried.portfolio.token}`);
    console.log(`positions:`);
    console.log(...all_queried.portfolio.positions);
    console.log('active orders:\n');
    console.log(...all_queried.active_orders);
    console.log('active deposits:\n');
    console.log(...all_queried.active_deposits);
    console.log('active withdrawals:\n');
    console.log(...all_queried.active_withdrawals);
    console.log('active withdrawals:\n');
    console.log(...all_queried.active_withdrawals);
    console.log('error messages:\n');
    console.log(...all_queried.errors);
    console.log('current trades:'); //current trades are the trades that happen within the local current calendar date
    console.log(...all_queried.trades_current);

    console.log(`ether balance of account ${account}:\t${await td.ether_balance()}`);

    setInterval(async () => {
        if (stage === 0) {
            stage = -1;
            console.log('\ndeposit 1.123456 ether...this will take tens of seconds to minutes');
            td
            //pick one of three to sign transactions
                .with_keystoreJsonV3(require('fs').readFileSync(keystore).toString(), password)
                //.with_private_key(privateKey)
                //.with_mnemonic(mnemonic, 0)
                .with_gas_arguments(await td.query_gas_price(true), 100000) //current gas price will be used to submit the order. In order for the deposit to be submitted faster, increase the gas price by an acceptable percentage
                .deposit(0.1123456)
                .on('submitted', orderLog => {
                    //submit callback will be triggered periodically till the transaction is filled
                    console.log('deposit submitted with the transaction hash: ' + orderLog.txHash + '\tand gas paid ' + orderLog.gasPaid + '\tfor the account ' + account);
                })
                .on('filled', tradeLog => {
                    console.log('deposit succeeded: ' + JSON.stringify(tradeLog));
                    stage = 1;
                })
                .on('error', err => {
                    console.log(err.message  + '\t' + account)
                });
        }
    }, 500);



    //withdraw 100.654321 TBC after the deposit is done
    setInterval(async () => {
        if(stage === 1){
            stage = -1;
            console.log('\nwithdraw 100.654321 TBC...this will take tens of seconds to minutes');

            td
            //pick one of three to sign transactions
                .with_keystoreJsonV3(require('fs').readFileSync(keystore).toString(), password)
                //.with_private_key(privateKey)
                //.with_mnemonic(mnemonic, 0)
                .with_gas_arguments(await td.query_gas_price(true), 100000) //current gas price will be used to submit the order. In order for the withdrawal to be submitted faster, increase the gas price by an acceptable percentage
                .withdraw(100.654321)
                .on('submitted', orderLog => {
                    //submit callback will be triggered periodically till the transaction is filled
                    console.log('withdrawal submitted with the transaction hash: ' + orderLog.txHash + '\tand gas paid ' + orderLog.gasPaid + '\tfor the account ' + account);
                })
                .on('filled', tradeLog => {
                    console.log('withdrawal succeeded: ' + JSON.stringify(tradeLog));
                    stage = 2
                })
                .on('error', async err => {
                    console.log(await err.message  + '\t' + account)
                });
        }

    }, 500);


    //transfer tokens to the 3rd address
    setInterval(() => {
        if(stage === 2){
            stage = -1;
            console.log('\ntransfer 11.123 TBC...this will take tens of seconds');

            td.with_keystoreJsonV3(require('fs').readFileSync(keystore).toString(), password).with_gas_arguments(10, 100000)
                .transfer_token(tokenReceiver, Number(11.123))
                .on('submitted', receipt =>
                    //submit callback will be triggered periodically till the transaction is filled
                    console.log(`the transfer has been submitted with transaction hash ${receipt.txHash}`))
                .on('filled', receipt => {
                    stage = 3;
                    console.log(`the transfer has been confirmed: ${receipt.txHash} and gas paid ${receipt.gasPaid / 1e18}`)
                })
                .on('error', err => console.log(err.toString()));
        }
    }, 500);

    setInterval(() => {
        if(stage === 3){
            stage = -1;
            console.log('\nmake a number of orders...this will take minutes');

            //instantiation of the market data class
            let md = new MD(td);

            //refresh rate in second of the market data of each category. if not set, default values will be used. Typically default values will do
            //the following settings are default values of the refresh rate. it will be safe to delete the following line
            let intervals = new Map().set('1', 10).set('2', 10).set('3', 30).set('4', 15);

            //specify the provider of each category. Each category can be implemented with multiple providers, but only one can be used.
            // For the time being, only one provider for each category.
            let providers = new Map().set('1', '163_api');

            //to subscribe to the market data feed. Please check metadata.js the for the all supported categories and instruments
            md
                .withIntervals(intervals)
                .withProviders(providers)
                .subscribe([
                    {category: 1, symbols:['600010.SS', '002083.SZ', '000300.SS']},
                    {category: 2, symbols:['USD.CNY.FX', 'JPY.CNY.FX', 'EUR.CNY.FX', 'USD.JPY.FX']},
                    {category: 3, symbols:['IVX.SS']},
                    {category: 4, symbols:['TBC.CNY.CRYPTO', 'ETH.USD.CRYPTO', 'BTC.JPY.CRYPTO', 'ETH.CNY.CRYPTO', 'BTC.EUR.CRYPTO', 'EOS.CNY.CRYPTO', 'TBC.USD.CRYPTO', 'BTC.TBC.CRYPTO', 'ETH.TBC.CRYPTO', 'EOS.TBC.CRYPTO', 'XMR.TBC.CRYPTO', 'XRP.TBC.CRYPTO', 'BCH.TBC.CRYPTO', 'LTC.TBC.CRYPTO']}
                ]);

            //the function to handle the upcoming quotations of all subscriptions
            let quoteHandle = async (c, f) => {
                let exchange = f.moment.format('YYYY-MM-DD HH:mm:ssZ');
                let local = f.moment.local().format('YYYY-MM-DD HH:mm:ssZ');
                console.log(`category: ${c}\texchange: ${exchange}\tlocal: ${local}\nquote:\t${JSON.stringify(f)}`);
                if(!toOrderMap.get(f.symbol)) {
                    toOrderMap.set(f.symbol, true);

                    if (md.isInTradingHours(c)) {
                        let orderJSON = {
                            category: c,  //currently category 1, 2, 3, 4 are supported
                            rawSymbol: f.symbol,
                            direction: 1, //1 for long, -1 for short
                            openClose: 1, //1 for open, -1 for close
                            leverage: 5.0, //please check the metadata.js for the range of leverage for specific category
                            tokenToInvest: 10.123456, //in terms of TBC
                            posHash: '', //empty for long order; as for close order, query the transaction to open the position for the transaction hash and input the hash here
                            price: f.ask * 1.02 //worst acceptable price
                        };
                        td
                            .with_keystoreJsonV3(require('fs').readFileSync(keystore).toString(), password)
                            //.with_private_key(privateKey)
                            //.with_mnemonic(menemonic, 0)
                            .with_gas_arguments(await td.query_gas_price(true), 100000) //current gas price will be used to submit the order. In order for the order to be submitted faster, increase the gas price by an acceptable percentage
                            .order(orderJSON, err => console.log(err))
                            .on('submitted', receipt => {
                                //submit callback will be triggered periodically till the transaction is filled
                                console.log(`the order has been submitted with transaction hash ${receipt.txHash} and gas paid ${receipt.gasPaid / 1e18}`);
                            })
                            .on('filled', receipt => {
                                //the tokenInvested field in the confirmation in the minimal decimal of TBC, which is 6. to divide the tokenInvested by 1e6 to get the actual number
                                //the tokenInvested field for the open order is the specified in the order, but for the close order
                                //  if positive it is the tokens added to the balance of the account after the position is close;
                                //  if negative, typically occurred in a forced liquidation, it is a deduction to the balance of the account. If the balance is lower than deduction, any open positions could be liquidated to compensate
                                //the ror field is the rate of return after calculating the leverage, i.e., the real rate of return for the position
                                console.log(`the order has been confirmed: ${receipt.confirmation}`);
                            })
                            .on('error', err => {
                                console.log(`ERROR: ${JSON.stringify(err)}`);
                            });
                    } else {
                        console.log('it is not in the trading hours!')
                    }
                }
            };

            md.onMarketData(quote => {
                    switch (quote.category) {
                        case 1:
                            quote.quotes.forEach(f => quoteHandle(1, f));
                            break;
                        case 2:
                            quote.quotes.forEach(f => quoteHandle(2, f));
                            break;
                        case 3:
                            quote.quotes.forEach(f => quoteHandle(3, f));
                            break;
                        case 4:
                            quote.quotes.forEach(f => quoteHandle(4, f));
                            break;
                    }
                }
            );
        }
    }, 500);

});
