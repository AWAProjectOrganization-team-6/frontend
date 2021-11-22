
export default function FoodItem (props) {

    const handleChange = (event) => {
        props.parentCallBack(event.target.value);
    };

    const Food = props.name.map((id) =>
        <div key={id}>
            <input onChange={handleChange}>
            </input>
        </div>
    );

    
    return(
        <>
            {Food}
        </>
    );
}