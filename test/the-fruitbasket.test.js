let assert = require("assert");
let TheFruit = require("../FruitBasket");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/fruit-Basket';

const pool = new Pool({
    connectionString
});
describe('The fruit basket function', function () {
    beforeEach(async() => {
        await pool.query('TRUNCATE TABLE fruitbasket');
    })



    it('should get the type of fruit', async function () {

        const theFruitBasket = await TheFruit(pool);
        await theFruitBasket.newBasketFruit('orange', 1, 2)
        const fruitsArr = await theFruitBasket.getFruits('orange');
    
        assert.deepEqual([{fruit: 'orange', quantity: 1, price: 2.00}], fruitsArr);

    });


    it('should update fruit in the basket', async function () {

        const theFruitBasket = await TheFruit(pool);
        await theFruitBasket.newBasketFruit('orange', 1, 2)
        await theFruitBasket.update('orange');
        await theFruitBasket.update('orange');
        const fruitsArr = await theFruitBasket.getFruits('orange');
        
    
        assert.deepEqual([{fruit: 'orange', quantity: 3, price: 2.00}], fruitsArr);

    });

    it('should calculate the total price of the fruit', async function () {

        const theFruitBasket = await TheFruit(pool);
        await theFruitBasket.newBasketFruit('orange', 1, 2);
        await theFruitBasket.newBasketFruit('Banana', 1, 2)

        await theFruitBasket.getFruits('orange');
    
        assert.deepEqual([{sum:2.00}],await theFruitBasket.showfruitTotal('Banana'));

    });
    it('should  be able to show the total sum of the fruit basket', async function () {

        const theFruitBasket = await TheFruit(pool);
        await theFruitBasket.newBasketFruit('Banana', 1, 2);
        await theFruitBasket.newBasketFruit('Banana', 1, 2);
        await theFruitBasket.newBasketFruit('Banana', 5, 2)
        await theFruitBasket.getFruits('Banana');
    
        assert.deepEqual([{sum:7}],await theFruitBasket.showTotalSum('Banana'));

    });


    after(function () {
        pool.end();
    })
});