import styles from '../styles/FoodCategory.module.scss';
import Food from './FoodItem';
import FileUploader from './FileUploader';

export default function Category (props) {
    var name = '';
    var price = 0.0;
    var desc = '';
    var picFile = '';

    const setFoodName = (event) => {
        name = (event.target.value);
    };

    const setPrice = (event) => {
        price = parseFloat(event.target.value);
    };

    const setDesc = (event) => {
        desc = (event.target.value);
    };

    const setPic = (event) => {
        picFile = event.target.files[0];

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
                    <div className={styles.row1}>
                        <input className={styles.input} onChange={setFoodName} placeholder={'Food name'}>
                        </input>
                        <input className={styles.input} type='number' min='0' onChange={setPrice} placeholder={'Food Price'}> 
                        </input>
                    </div>
                    <div className={styles.row2}>
                        <input className={styles.input} placeholder={'Description'} onChange={setDesc}>
                        </input>
                        <FileUploader selected={setPic} style={styles.fileInput}/>
                        <button className={styles.button} onClick={() => props.addFood(props.category, name, price, desc, picFile)}>
                            + Add 
                        </button>
                    </div>
                </div>
                <div className={styles.foods}>
                    {props.category.foods.map((foods, index) => <Food key={index} food={foods} parentCallBack={props.deleteFood} categoryId={props.category.id}/>)}
                </div>
            </div>
        </>
    );
}