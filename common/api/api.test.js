const api = require("./api")
// @ponicode
describe("api.getNodeOptions", () => {
    test("0", () => {
        let callFunction = () => {
            api.getNodeOptions()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("api.getNetworkInfo", () => {
    test("0", () => {
        let callFunction = () => {
            api.getNetworkInfo("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            api.getNetworkInfo(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("api.getLatestBlocks", () => {
    test("0", () => {
        let callFunction = () => {
            api.getLatestBlocks()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("api.searchBlockchain", () => {
    test("0", () => {
        let callFunction = () => {
            api.searchBlockchain("Foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            api.searchBlockchain("This is a Text")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            api.searchBlockchain("foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            api.searchBlockchain("Hello, world!")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            api.searchBlockchain(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("api.all", () => {
    test("0", () => {
        let callFunction = () => {
            api.all(["GET", "POST", "PUT", "DELETE"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            api.all("https://api.telegram.org/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            api.all("www.google.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            api.all("ponicode.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            api.all("https://")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            api.all(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
