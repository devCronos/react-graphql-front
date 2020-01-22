import ItemComponent from '../components/Item';
import {shallow} from 'enzyme';
import { exists } from 'fs';
import toJSON from 'enzyme-to-json';

const fakeItem = {
    id: 'abc',
    title: 'cool item',
    price: 4000,
    description: 'really cool item',
    image: 'dog.jpg',
    largeImage: 'banana.jpg'
}

describe('<Item />',() =>{
    it('renders and matches the snapshot',() => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    })
    // it('renders and displays properly',() =>{
    //     const wrapper = shallow(<ItemComponent item={fakeItem}></ItemComponent>);
    //     const priceTag = wrapper.find('PriceTag');
    //     // console.log(priceTag.children().text());
    //     expect(priceTag.dive().text()).toBe('$50');
    //     expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
    //     const img = wrapper.find('img');
    //     expect(img.props().src).toBe(fakeItem.image);
    //     expect(img.props().alt).toBe(fakeItem.title);
    // });
    // it('renders out the buttons properly',() => {
    //     const wrapper = shallow(<ItemComponent item={fakeItem}></ItemComponent>);
    //     const buttonList = wrapper.find('.buttonList');
    //     expect(buttonList.children()).toHaveLength(3);
    //     expect(buttonList.find('Link')).toHaveLength(1);
    //     expect(buttonList.find('Link')).toBeTruthy();
    //     expect(buttonList.find('AddToCart').exists()).toBe(true);
    // })
})