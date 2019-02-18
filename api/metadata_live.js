module.exports = Object.freeze({
    metadata: {
        appName: 'tradebridgecoinclient',
        response: 'success',
        net: 'LIVE',
        message: 'assets that are eligible to be made market for',
        updateTime: '2018-07-25 12:34:52',
        tokenAddress: '0xf80b38198a7803990662e8aa53ff42117c5ad29f', //new : '0x2b8fbbdf43a05f24f0713886b10d14fd2134dc53',
        tokenStartBlockNumber: 7069539,
        data: {
            supportedCategories: ['1', '2', '3', '4'],
            categories: {
                '1': {
                    description: 'stocks, indices, bonds and convertibles on China A-Share market',
                    postfix: ['SS', 'SZ'],
                    examples:['600010.SS', '000010.SZ'],
                    timeZone: "Asia/Shanghai",
                    tradingHours: {
                        time: ["09:30-11:30", "13:00-15:00"],
                        day: ['mon', 'tue', 'wed', 'thu', 'fri'],
                        dayOff:[]
                    },
                    providers:['163_api'],
                    leverage:[0, 10],
                    symbols: [/^\d{6}.[Ss][SszZ]$/g]
                },
                '2': {
                    description: 'foreign exchange pairs, including all major currencies against USD, as well as major currencies against CNY',
                    postfix: ['FX'],
                    examples:['EUR.USD.FX', 'USD.CNY.FX'],
                    timeZone: "Asia/Shanghai",
                    tradingHours: {
                        time: ["00:00-24:00"],
                        day: ['mon', 'tue', 'wed', 'thu', 'fri'],
                        dayOff:[]
                    },
                    providers:['boc'],
                    leverage:[0, 20],
                    symbols:['USD.CNY.FX', 'USD.JPY.FX', 'EUR.USD.FX', 'GBP.USD.FX', 'AUD.USD.FX', 'NZD.USD.FX', 'JPY.CNY.FX', 'EUR.CNY.FX', 'GBP.CNY.FX', 'AUD.CNY.FX', 'HKD.CNY.FX', 'NZD.CNY.FX']
                },
                '3': {
                    description: 'volatility index of China`s A-Share market based on the SHEX 50 ETF options',
                    postfix: ['SS'],
                    examples:['IVX.SS'],
                    timeZone: "Asia/Shanghai",
                    tradingHours: {
                        time: ["09:30-11:30", "13:00-15:00"],
                        day: ['mon', 'tue', 'wed', 'thu', 'fri'],
                        dayOff:[]
                    },
                    providers:['sina_api'],
                    leverage:[0, 10],
                    symbols: ['IVX.SS'],
                    dailyDecay: 0.0025
                },
                '4': {
                    description: '(USD, EUR, GBP, JPY, AUD, NZD, CNY, HKD) against (BTC, ETH, BCH, LTC, EOS, XRP, XMMR, TBC) and cryptocurrencies against TBC',
                    postfix: ['CRYPTO'],
                    examples:['BTC.EUR.CRYPTO', 'BTC.TBC.CRYPTO', 'TBC.USD.CRYPTO'],
                    timeZone: "UTC",
                    tradingHours: {
                        time: ["00:00-24:00"],
                        day: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
                        dayOff:[]
                    },
                    providers:['coincompare', 'coinmarketcap'],
                    leverage:[0, 20],
                    symbols: [
                        'BTC.USD.CRYPTO',
                        'BTC.CNY.CRYPTO',
                        'BTC.JPY.CRYPTO',
                        'BTC.EUR.CRYPTO',
                        'BTC.GBP.CRYPTO',
                        'BTC.AUD.CRYPTO',
                        'BTC.NZD.CRYPTO',
                        'BTC.HKD.CRYPTO',
                        'ETH.USD.CRYPTO',
                        'ETH.CNY.CRYPTO',
                        'ETH.JPY.CRYPTO',
                        'ETH.EUR.CRYPTO',
                        'ETH.GBP.CRYPTO',
                        'ETH.AUD.CRYPTO',
                        'ETH.NZD.CRYPTO',
                        'ETH.HKD.CRYPTO',
                        'XRP.USD.CRYPTO',
                        'XRP.CNY.CRYPTO',
                        'XRP.JPY.CRYPTO',
                        'XRP.EUR.CRYPTO',
                        'XRP.GBP.CRYPTO',
                        'XRP.AUD.CRYPTO',
                        'XRP.NZD.CRYPTO',
                        'XRP.HKD.CRYPTO',
                        'BCH.USD.CRYPTO',
                        'BCH.CNY.CRYPTO',
                        'BCH.JPY.CRYPTO',
                        'BCH.EUR.CRYPTO',
                        'BCH.GBP.CRYPTO',
                        'BCH.AUD.CRYPTO',
                        'BCH.NZD.CRYPTO',
                        'BCH.HKD.CRYPTO',
                        'EOS.USD.CRYPTO',
                        'EOS.CNY.CRYPTO',
                        'EOS.JPY.CRYPTO',
                        'EOS.EUR.CRYPTO',
                        'EOS.GBP.CRYPTO',
                        'EOS.AUD.CRYPTO',
                        'EOS.NZD.CRYPTO',
                        'EOS.HKD.CRYPTO',
                        'LTC.USD.CRYPTO',
                        'LTC.CNY.CRYPTO',
                        'LTC.JPY.CRYPTO',
                        'LTC.EUR.CRYPTO',
                        'LTC.GBP.CRYPTO',
                        'LTC.AUD.CRYPTO',
                        'LTC.NZD.CRYPTO',
                        'LTC.HKD.CRYPTO',
                        'XMR.USD.CRYPTO',
                        'XMR.CNY.CRYPTO',
                        'XMR.JPY.CRYPTO',
                        'XMR.EUR.CRYPTO',
                        'XMR.GBP.CRYPTO',
                        'XMR.AUD.CRYPTO',
                        'XMR.NZD.CRYPTO',
                        'XMR.HKD.CRYPTO',
                        'TBC.USD.CRYPTO',
                        'TBC.CNY.CRYPTO',
                        'TBC.JPY.CRYPTO',
                        'TBC.EUR.CRYPTO',
                        'TBC.GBP.CRYPTO',
                        'TBC.AUD.CRYPTO',
                        'TBC.NZD.CRYPTO',
                        'TBC.HKD.CRYPTO',
                        'BTC.TBC.CRYPTO',
                        'ETH.TBC.CRYPTO',
                        'XRP.TBC.CRYPTO',
                        'BCH.TBC.CRYPTO',
                        'EOS.TBC.CRYPTO',
                        'LTC.TBC.CRYPTO',
                        'XMR.TBC.CRYPTO']
                }
            }
        }
    }
});