import React from 'react'
import { IconContext } from "react-icons";
import { MdCancel } from 'react-icons/md';

export default function Cancel() {
    return (
        <div>
            <IconContext.Provider
                key="2"
                value={{
                  color: "red",
                }}
              >
                <span
                //   onClick={() => this.ACTIONS[action].handler(ticket._id, index)}
                >
                    <MdCancel />
                </span>
              </IconContext.Provider>
        </div>
    )
}
