import React from "react";

export const TransactionInfo = ({keysOfProperties, property}) => (
    <div>
        {
            Object.keys(property).map((key, i) => {
                if (keysOfProperties.includes(key)) {
                    return (
                        <div key={i}>
                            <h5 style={{marginBottom: '2px', wordWrap: 'break-word'}}>
                                <b>{key}</b>: {(key === 'block_height' && property[key] === 0) ? 'unconfirmed' : String(property[key])}</h5>
                        </div>
                    )
                }
            })
        }
    </div>
);
