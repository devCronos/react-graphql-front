import {mount} from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Nav from '../components/Nav';
import {CURRENT_USER_QUERY} from '../components/User';
import {MockedProvider} from 'react-apollo/test-utils';
import {fakeUser, fakeCartItem} from '../lib/testUtils';

const notSignedInMock = [{
    request: {query: CURRENT_USER_QUERY},
    // delay: 55,
    result: {data: {
        me: null
    }}
}];

const signedInMock = [{
    request: {query: CURRENT_USER_QUERY},
    // delay: 55,
    result: {data: {
        me: fakeUser()
    }}
}];

const signedInWithCartItemsMock = [{
    request: {query: CURRENT_USER_QUERY},
    // delay: 55,
    result: {data: {
        me: fakeUser(),
        cart: [fakeCartItem(), fakeCartItem()]
    }}
}];

describe('<Nav />',() =>{
    it('renders a minimal nav when signed out',async () => {
        
        const wrapper = mount(
            <MockedProvider mocks={notSignedInMock}>
                <Nav  />
            </MockedProvider>
        );

        await wait();
        wrapper.update();
        const nav = wrapper.find('ul[data-test="nav"]');
        expect(toJSON(nav)).toMatchSnapshot();

    });
    it('renders the full nav when logged in',async () => {
        const wrapper = mount(
            <MockedProvider mocks={signedInMock}>
                <Nav  />
            </MockedProvider>
        );

        await wait();
        wrapper.update();
        const nav = wrapper.find('ul[data-test="nav"]');
        expect(nav.children().length).toBe(6);
        expect(nav.text()).toContain('Sign Out');
        // expect(toJSON(nav)).toMatchSnapshot();

    });
    it('renders the amount of items in the cart',async () => {
        const wrapper = mount(
            <MockedProvider mocks={signedInWithCartItemsMock}>
                <Nav  />
            </MockedProvider>
        );

        await wait();
        wrapper.update();
        const nav = wrapper.find('ul[data-test="nav"]');
        const count = nav.find('div.count');
        expect(toJSON(count)).toMatchSnapshot();

    });
});