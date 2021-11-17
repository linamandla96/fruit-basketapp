module.exports = (pool) => {



async function newBasketFruit(fruitname,quant,cost){
     await pool.query('insert into fruitbasket (fruit,quantity,price) values($1,$2,$3)', [fruitname,quant,cost])
}

async function getFruits(fruitname){

var fruitType = await pool.query('select fruit,quantity,price from fruitbasket where fruit = $1',[fruitname])
return fruitType.rows;
}
async function update(fruitname){
await pool.query('UPDATE  fruitbasket SET  quantity = quantity  + 1  WHERE fruit  = $1', [fruitname])
}



async function showfruitTotal(fruit){
var fruitprice = await pool.query ('select sum(price) from fruitbasket where fruit = $1', [fruit])


return fruitprice.rows;
}

async function showTotalSum(fruit){
    var fruitotal = await pool.query ('select sum(quantity) from fruitbasket where fruit = $1', [fruit])
    
    
    return fruitotal.rows;
    }
    
return{
    newBasketFruit,
    getFruits,
    update,
    showfruitTotal,
    showTotalSum
}

}