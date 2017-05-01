import React from "react";

Array.prototype.diff = function (a) {
    return this.filter(function (i) {
        return a.indexOf(i) < 0;
    });
};

export function formatBytes(a, b) {
    if (0 == a)return "0 Bytes";
    let c = 1e3, d = b || 2, e = ["Bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}


export const formatFee = (input) => {
    return parseFloat(String(input / 1000000000000).substring(0, 5))

}

export const removeObjectProperties = function (obj, props) {
    for (let i = 0; i < props.length; i++) {
        if (obj.hasOwnProperty(props[i])) {
            delete obj[props[i]];
        }
    }
};

export const removeObjectPropertiesFromListOfObjects = function (listOfObjcts, props) {
    let copyListOfObjects = JSON.parse(JSON.stringify(listOfObjcts));
    copyListOfObjects.map((object, i) => {
        removeObjectProperties(object, props)
    })
    return copyListOfObjects
}


export const buildColumnFromObject = function (object, keysToExclude = [], customRender = {}) {
    let columns = [];
    let keys = Object.keys(object);
    let uniqueKeys = keys.diff(keysToExclude)
    uniqueKeys.map((key, i) => {
            let toPush = {
                header: key,
                accessor: key,
            }

            if (key in customRender) {
                Object.keys(customRender[key]).forEach((nestedKey) => {
                    toPush[nestedKey] = customRender[key][nestedKey]
                });
            }

            columns.push(toPush)

        }
    )
    return columns
}

export function makeDataWithExcludedPropertiesAndFilterBasedOnProperties(data, excludedProperties = [], filterDataOnPropertiesTruthyness = []) {
    let copyTransactions = []

    data.map((object, i) => {
            let canPush = true;

            // sets capPush to false when property is truthy
            for (let eachProperty = 0; eachProperty < filterDataOnPropertiesTruthyness.length; eachProperty++) {
                let filteredProperty = filterDataOnPropertiesTruthyness[eachProperty]
                if (object[filteredProperty]) {
                    canPush = false;
                    break
                }
            }
            if (canPush) {
                copyTransactions.push(object)
            }
        }
    )

    return removeObjectPropertiesFromListOfObjects(copyTransactions, excludedProperties)
}


export function makeDataWithExcludedPropertiesAndIncludeBasedOnProperties(data, excludedProperties = [], IncludeDataOnPropertiesTruthyness = []) {
    let copyTransactions = []

    data.map((object, i) => {
            let canPush = false;

            // sets canPush to true when property is truthy
            for (let eachProperty = 0; eachProperty < IncludeDataOnPropertiesTruthyness.length; eachProperty++) {
                let filteredProperty = IncludeDataOnPropertiesTruthyness[eachProperty]
                if (object[filteredProperty]) {
                    canPush = true;
                    break
                }
            }
            if (canPush) {
                copyTransactions.push(object)
            }
        }
    )

    return removeObjectPropertiesFromListOfObjects(copyTransactions, excludedProperties)

}
