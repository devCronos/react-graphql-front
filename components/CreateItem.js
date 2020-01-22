import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from '../components/ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $image: String
        $largeImage: String
        $price: Int!
    ) {
        createItem(
            title: $title
            description: $description
            image: $image
            largeImage: $largeImage
            price: $price
        ) {
            id
        }
    }
`;

class CreateItem extends Component {
    state = {
        title: 'Title',
        description: 'lorem ipsum dolor something',
        image: '',
        largeImage: '',
        price: 1000
    }
    handleChange = (e) => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value):value;
        this.setState({ [name]: val});
    }
 
    uploadFile = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'sickfits');

        const res = await fetch('https://api.cloudinary.com/v1_1/dxycrh6iw/image/upload', {
            method: 'POST',
            body: data
        });
        const file = await res.json();
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        })
    }

    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION}
            variables={this.state} >
                {(createItem, { loading, error }) => (
                    <Form data-test="form" onSubmit={async (e) => {
                        //  stop the form from submitting
                        e.preventDefault();
                        // call the mutation
                        const res = await createItem();
                        // route to item page
                        Router.push({
                            pathname: '/item',
                            query: {id: res.data.createItem.id}
                        })
                    }}>
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="title">
                                Title
                                <input type="text" id="title" name="title" placeholder="Title" 
                                value={this.state.title}
                                onChange={this.handleChange}
                                required />
                            </label>
                            <label htmlFor="price">
                                Price
                                <input type="number" id="price" name="price" placeholder="Price" 
                                value={this.state.price}
                                onChange={this.handleChange}
                                required />
                            </label>
                            <label htmlFor="description">
                                Description
                                <textarea type="text" id="description" name="description" placeholder="Description" 
                                value={this.state.description}
                                onChange={this.handleChange}
                                required />
                            </label>
                            <label htmlFor="file">
                                Upload an image
                                <input type="file" id="file" name="file" placeholder="Upload an image" 
                                
                                onChange={this.uploadFile}
                                required />
                                {this.state.image && <img src={this.state.image} width="200" alt="Upload preview" />}
                            </label>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
            
        );
    }
}

export default CreateItem;
export {CREATE_ITEM_MUTATION};
