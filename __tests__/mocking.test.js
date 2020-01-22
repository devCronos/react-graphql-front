function Person(name, foods){
    this.name = name;
    this.foods = foods;
}
Person.prototype.fetchFoods = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(this.foods), 2000);
    })
}

describe('try some mocking', () => {
    it('mocks a reg function', () => {
        const fetchDogs = jest.fn();
        fetchDogs('snickers');
        expect(fetchDogs).toHaveBeenCalled();
        expect(fetchDogs).toHaveBeenCalledWith('snickers');
        
    })

    it('can create a person',() => {
        const me = new Person('Wes', ['pizza', 'bugs']);
        expect(me.name).toBe('Wes');
    })

    it('can fetch foods',async () => {
        const me = new Person('Wes', ['pizza', 'bugs']);
        // mock the fetchFoods function
        me.fetchFoods = jest.fn().mockResolvedValue(['banana','rocks']);
        const favFoods = await me.fetchFoods();
        expect(favFoods).toContain('banana');
    })
})