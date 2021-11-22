import styles from '../styles/FoodCategory.module.scss';
import Food from './FoodItem';

export default function Category (props) {

    const numOfFoods = [

    ];
    
    const addFood = () => {

    };

    const handleFoods = (event) => {

    };

    const listOfCategories = props.name.map((name) =>
        <div key={name.id} className={styles.category}>
            <div>
                <label >
                    
                </label>
                <button className={styles.button} onClick={addFood}>
                    + Food
                </button>
                <button className={styles.button}>
                    Delete
                </button>
            </div>
            <Food name={numOfFoods} parentCallBack={handleFoods}/>
        </div>
    );

    
    return(
        <>
            {listOfCategories}
        </>
    );
}