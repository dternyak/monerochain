import React from "react";
import {
    formatFee,
    formatBytes,
} from "utils/tableHelpers";


export const TransactionInfo = ({keysOfProperties, property}) => (
    <div>
        {
            Object.keys(property).map((key, i) => {
                if (keysOfProperties.includes(key)) {

                    if (key === "confirmations") {
                        return ( <div key={i}>
                                <h2 style={{marginBottom: '2px', wordWrap: 'break-word'}}>
                                    <b>{key}</b>: {(key === 'block_height' && property[key] === 0) ? 'unconfirmed' : String(property[key])}
                                </h2>
                            </div>
                        )
                    } else if (key === "tx_fee") {
                        return (
                            <div key={i}>
                                <h5 style={{marginBottom: '2px', wordWrap: 'break-word'}}>
                                    <b>{key}</b>: {(key === 'block_height' && property[key] === 0) ? 'unconfirmed' : String(formatFee(property[key]))}
                                </h5>
                            </div>
                        )
                    } else if (key === "tx_size") {
                        return (
                            <div key={i}>
                                <h5 style={{marginBottom: '2px', wordWrap: 'break-word'}}>
                                    <b>{key}</b>: {(key === 'block_height' && property[key] === 0) ? 'unconfirmed' : String(formatBytes(property[key], 2))}
                                </h5>
                            </div>
                        )
                    } else {
                        return (
                            <div key={i}>
                                <h5 style={{marginBottom: '2px', wordWrap: 'break-word'}}>
                                    <b>{key}</b>: {(key === 'block_height' && property[key] === 0) ? 'unconfirmed' : String(property[key])}
                                </h5>
                            </div>
                        )
                    }
                }
            })
        }
    </div>
);
