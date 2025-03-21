import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/menu-bg.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import PopularMenu from '../../Home/PopularMenu/PopularMenu';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === "dessert")
    const soup = menu.filter(item => item.category === "soup")
    const salad = menu.filter(item => item.category === "salad")
    const pizza = menu.filter(item => item.category === "pizza")
    const offered = menu.filter(item => item.category === "offered")

    return (
        <div>
            <Helmet>
                <title>Our Menu</title>
            </Helmet>
            <Cover img={menuImg} title={"our menu"} description={"Would you like to try our delicious food?"}></Cover>
            <SectionTitle heading={"Today's Offer"} subHeading={"Don't miss"}></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={desserts} title={"desserts"} img={dessertImg} description={"Would you like to try our desserts?"}></MenuCategory>
            <MenuCategory items={pizza} title={"pizza"} img={pizzaImg} description={"Would you like to try our pizza?"}></MenuCategory>
            <MenuCategory items={salad} title={"salad"} img={saladImg} description={"Would you like to try our salad?"}></MenuCategory>
            <MenuCategory items={soup} title={"soup"} img={soupImg} description={"Would you like to try our soup?"}></MenuCategory>
        </div>
    );
};

export default Menu;