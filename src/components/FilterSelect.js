import React from 'react'

const FilterSelect = (props) => {
    return (
        <div>
            {props.choices.map((choice, index) => {
                return <span key={index} style={{paddingLeft:10}}>
                    <input onChange={props.handleSelection} type="radio" name={props.category} value={choice} />
                    <label>{choice}</label>
                  </span>;
            })}
        </div>
    )
}

export default FilterSelect