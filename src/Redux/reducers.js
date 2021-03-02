// import actions from './actions';
import MenuBurgerImage from '../Media/Images/MenuImages/MenuBurger.jpg';
import MenuPizzaImage from '../Media/Images/MenuImages/MenuPizza.jpg';
import MenuFriesImage from '../Media/Images/MenuImages/MenuFries.jpg';
import MenuPastaImage from '../Media/Images/MenuImages/MenuPasta.jpg';
import MenuSandwichImage from '../Media/Images/MenuImages/MenuSandwich.jpg';
import MenuChickenImage from '../Media/Images/MenuImages/MenuChicken.jpg';
import MenuDonughtImage from '../Media/Images/MenuImages/MenuDonught.jpg';
import MenuDessertImage from '../Media/Images/MenuImages/MenuDessert.jpg';
import BurgerBaconBurger from '../Media/Images/BurgerVariants/BaconBurger.jpg'
import BurgerBaconBeefBurger from '../Media/Images/BurgerVariants/BaconBeefBurger.jpg'
import BurgerBaconCheeseBurger from '../Media/Images/BurgerVariants/BaconCheeseBurger.jpg'
import BurgerWithSaladBurger from '../Media/Images/BurgerVariants/BurgerWithSalad.jpg'
import BurgerCheeseBurger from '../Media/Images/BurgerVariants/CheeseBurger.jpg'
import BurgerCheeseGrilledBurger from '../Media/Images/BurgerVariants/CheeseGrilledBurger.jpg'
import BurgerFlavouredBurger from '../Media/Images/BurgerVariants/FlavouredBurger.jpg'
import BurgerTurkeyBurger from '../Media/Images/BurgerVariants/TurkeyBurger.jpg'
import BurgerVeggieBurger from '../Media/Images/BurgerVariants/VeggieBurger.jpg'


const initialState = {
  menuItems: {
    'Burger': MenuBurgerImage,
    'Pizza': MenuPizzaImage,
    'Fries': MenuFriesImage,
    'Pasta': MenuPastaImage,
    'Chicken': MenuChickenImage,
    'Sandwich': MenuSandwichImage,
    'Donught': MenuDonughtImage,
    'Dessert': MenuDessertImage
  },
  Burger:{
    'burgerType1': {
      'name':'Bacon Burger',
      'price':'5$',
      'image':BurgerBaconBurger
    },
    'burgerType2': {
      'name':'Bacon Beef Burger',
      'price':'10$',
      'image':BurgerBaconBeefBurger
    },
    'burgerType3': {
      'name':'Cheese Burger with Bacon',
      'price':'8$',
      'image':BurgerBaconCheeseBurger
    },
    'burgerType4': {
      'name':'Burger with Salad',
      'price':'12$',
      'image':BurgerWithSaladBurger
    },
    'burgerType5': {
      'name':'Cheese Burger',
      'price':'5$',
      'image':BurgerCheeseBurger
    },
    'burgerType6': {
      'name':'Grilled Cheese Burger',
      'price':'9$',
      'image':BurgerCheeseGrilledBurger
    },
    'burgerType7': {
      'name':'Flavoured Burger',
      'price':'12$',
      'image':BurgerFlavouredBurger
    },
    'burgerType8': {
      'name':'Turkey Burger',
      'price':'6$',
      'image':BurgerTurkeyBurger
    },
    'burgerType9': {
      'name':'Veggie Burger',
      'price':'4$',
      'image':BurgerVeggieBurger
    },
  },

};

const rootReducer = (state=initialState, action) => {
  return state;
};

export default rootReducer;
