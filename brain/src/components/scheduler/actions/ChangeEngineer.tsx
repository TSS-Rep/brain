import React from 'react'
import { IconContext } from "react-icons";
import { FaExchangeAlt } from 'react-icons/fa';

export default function ChangeEngineer() {
    return (
        <div>
            <IconContext.Provider
                key="3"
                value={{
                  color: "orange",
                }}
              >
                <span
                //   onClick={() => this.ACTIONS[action].handler(ticket._id, index)}
                >
                    <FaExchangeAlt />
                </span>
              </IconContext.Provider>
        </div>
    )
}
