// 木盘子
class WoodenBowl {
    pack() {
        return 'WoodenBowl'
    }
}

// 瓶子
class Bottle {
    pack() {
        return 'Bottle'
    }
}

// 小吃用木碗装
class Snack {
    packing() {
        return new WoodenBowl()
    }
}

// 饮品用瓶装
class Drink {
    packing() {
        return new Bottle()
    }
}

// 可乐
class Coke extends Drink {
    price() {
        return 3.00
    }
    name() {
        return 'Coke'
    }
}

// 茶
class Tea extends Drink {
    price() {
        return 5.00
    }
    name() {
        return 'Tea'
    }
}

// 薯条
class FrenchFries extends Snack {
    price() {
        return 15.00
    }
    name() {
        return 'FrenchFries'
    }
}

// 面包
class Bread extends Snack {
    price() {
        return 5.00
    }
    name() {
        return 'Bread'
    }
}

// 套餐
class Meal {
    constructor() {
        this.items = []
    }
    addItem(item) {
        this.items.push(item);
    }
    getCost() {
        let cost = 0.0;
        for (const item of this.items) {
            cost += item.price();
        }
        return cost;
    }
    showItems() {
        for (const item of this.items) {
            const nameStr = "Item : " + item.name();
            const packStr = "Packing : " + item.packing().pack();
            const priceStr = "Price : " + item.price();
            console.log(`${nameStr},${packStr},${priceStr}`);
        }
    }
}

//  建造套餐
class MealBuilder {
    prepare2People() {
        const meal = new Meal();
        meal.addItem(new Coke());
        meal.addItem(new Tea());
        meal.addItem(new Bread());
        meal.addItem(new FrenchFries());
        return meal;
    }
    prepare1People() {
        const meal = new Meal();
        meal.addItem(new Coke());
        meal.addItem(new FrenchFries());
        return meal;
    }
}

const mealBuilder = new MealBuilder();
const people2 = mealBuilder.prepare2People();
people2.showItems();
console.log("Total Cost: " + people2.getCost());