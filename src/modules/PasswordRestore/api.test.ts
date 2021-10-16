import * as api from "modules/PasswordRestore/api"
// @ponicode
describe("api.fetchSubmitPassword", () => {
    test("0", () => {
        let callFunction: any = () => {
            api.fetchSubmitPassword({ email: "something.example.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            api.fetchSubmitPassword({ email: "something@example.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            api.fetchSubmitPassword({ email: "ponicode.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            api.fetchSubmitPassword({ email: "user@host:300" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            api.fetchSubmitPassword({ email: "TestUpperCase@Example.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            api.fetchSubmitPassword({ email: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("api.fetchSubmitRestore", () => {
    test("0", () => {
        let callFunction: any = () => {
            api.fetchSubmitRestore({ pass: "YouarenotAllowed2Use", passAgain: "Www.GooGle.com", tokenPassword: "oAuthToken" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            api.fetchSubmitRestore({ pass: "YouarenotAllowed2Use", passAgain: "https://twitter.com/path?abc", tokenPassword: "oAuthToken" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            api.fetchSubmitRestore({ pass: "!Lov3MyPianoPony", passAgain: "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg", tokenPassword: "u7djsl186ksk99-DsklLk89" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            api.fetchSubmitRestore({ pass: "YouarenotAllowed2Use", passAgain: "http://www.croplands.org/account/confirm?t=", tokenPassword: "u7djsl186ksk99-DsklLk89" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            api.fetchSubmitRestore({ pass: "NoWiFi4you", passAgain: "Www.GooGle.com", tokenPassword: "oAuthToken" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            api.fetchSubmitRestore({ pass: "", passAgain: "", tokenPassword: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})
