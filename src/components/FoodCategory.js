import styles from '../styles/FoodCategory.module.scss';
import Food from './FoodItem';

export default function Category (props) {
 
    var name = '';
    var price = '';


    const setFoodName = (event) => {
        name = (event.target.value);
    };

    const setPrice = (event) => {
        price = (event.target.value);
    };


    
    return(
        <>
            <div className={styles.content}>
                <div className={styles.category}>
                    <label className={styles.label}>
                        {props.category.name}
                    </label>
                    <button className={styles.button} onClick={() => props.deleteCategory(props.category.id)}>
                        Delete
                    </button>
                </div>
                <div className={styles.food}>
                    <input className={styles.input} onChange={setFoodName} placeholder={'Food name'}>
                    </input>
                    <input className={styles.input} type='number' min='0' onChange={setPrice} placeholder={'Food price'}> 
                    </input>
                    <button className={styles.button} onClick={() => props.addFood(props.category, name, price)}>
                        + Add 
                    </button>
                </div>
                <div className={styles.foods}>
                    {props.category.foods.map((foods, index) => <Food key={index} food={foods} parentCallBack={props.deleteFood} categoryId={props.category.id}/>)}
                </div>
            </div>
        </>
    );
}
