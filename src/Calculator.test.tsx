import Calculator from "./Calculator";
import * as ReactDOM from 'react-dom'

describe('Calculator tests', ()=>{

  let container: HTMLDivElement
  beforeEach(()=>{
    container= document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<Calculator/>,container);

  })
  afterEach(()=>{
    document.body.removeChild(container);
    container.remove();
  })
   it('renders correctly the document',()=>{
     const inputs= container.querySelectorAll('input');
     expect(inputs).toHaveLength(4);
     expect(inputs[0].name).toBe('cartvalue');
     expect(inputs[1].name).toBe('deliverydistance');
     expect(inputs[2].name).toBe('amountofitems');
     expect(inputs[3].name).toBe('datetime');

   })
   it('button is working',()=>{
     const button= container.querySelectorAll('button');
     expect(button).toHaveLength(1)
     expect(button[0].name).toBe('submit');
   })
})