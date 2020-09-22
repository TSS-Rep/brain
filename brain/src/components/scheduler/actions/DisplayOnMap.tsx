import React from 'react'
import { IconContext } from "react-icons";
import { MdLocationOn } from 'react-icons/md';

export default function DisplayOnMap() {

    return (
        <div>
            <IconContext.Provider
                key="4"
                value={{
                  color: "green",
                }}
              >
                <span
                //   onClick={() => this.ACTIONS[action].handler(ticket._id, index)}
                >
                  <MdLocationOn />
                </span>
              </IconContext.Provider>
        </div>
    )
}
