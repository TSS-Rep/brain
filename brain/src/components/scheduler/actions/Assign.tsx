import React from 'react'
import { IconContext } from "react-icons";
import { FaCheckCircle } from 'react-icons/fa';

export default function Assign() {
    function assign(e:any) {
      e.stopPropagation()
      alert("hola")
    }
    return (
        <div>
            <IconContext.Provider
                key="1"
                value={{
                  color: "green",
                }}
              >
                <span
                  onClick={assign}
                >
                    <FaCheckCircle />
                </span>
              </IconContext.Provider>
        </div>
    )
}
