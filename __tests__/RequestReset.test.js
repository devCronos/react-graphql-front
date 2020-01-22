import {mount} from 'enzyme';
import wait from 'waait';
import RequestReset, {REQUEST_RESET_MUTATION} from '../components/RequestReset';
import toJSON from'enzyme-to-json';
import {MockedProvider} from 'react-apollo/test-utils';

const mocks = [{
    request: {query: REQUEST_RESET_MUTATION, variables: {email:'cronos@yahoo.com'}},
    result: {data: {
        requestReset: {message: 'success', __typename: 'Message'}
    }}
}];

describe('<RequestReset />',() => {
    it('renders and matches snapshot', async () => {
        const wrapper = mount(
            <MockedProvider>
                <RequestReset />
            </MockedProvider>
        )
        const form = wrapper.find('form[data-test="form"]');
        expect(toJSON(form)).toMatchSnapshot();
    })
    it('calls the mutation', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <RequestReset />
            </MockedProvider>
        )
        const form = wrapper.find('form[data-test="form"]');
        // simulate typing an email
        wrapper.find('input')
            .simulate('change',{target: {name:'email', value:'cronos@yahoo.com'}});
        form.simulate('submit');
        await wait(100);
        wrapper.update();
        expect(wrapper.find('p').text()).toContain('Success! Check your email for the reset link')
    })
})