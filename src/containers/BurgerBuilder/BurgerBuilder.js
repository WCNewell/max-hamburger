import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-order'

const INGREDIENT_PRICES = {
    salad: 1.0,
    cheese: 2.0,
    meat: 3.0,
    bacon: 2.0,
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //      super(props) {
    //         this.state = {...}
    //     }
    // }
    // the above works, but below is more "modern" syntax for handling of state:
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchaseable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
            if (oldCount <= 0) {
                return;
            }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    purchasedHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // alert('Continue!')
        // .json endpoint is added below for firebase functionality
        this.setState( { loading: true } )
        const order = {
            ingredients: this.state.ingredients,
            // price is normally set up on the SERVER so that a customer cannot alter it!!!
            price: this.state.totalPrice,
            customer: {
                name: 'Clark Newell',
                address: {
                    street: '123 Gorgeous View Road',
                    zipCode: '84043',
                    country: 'Lehi-UT-USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'   
        }
        axios.post('/orders.json', order)
            .then(response=> {
                this.setState({ loading: false, purchasing: false })
            })
            .catch(error=> {
                this.setState({ loading: false, purchasing: false })
            })
    }
    
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>
        if ( this.state.loading ) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHander}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}
                    ordered={this.purchasedHandler} />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios)