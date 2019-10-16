import React, { Component } from 'react';
import Dropdown from './Dropdown';

class AreaA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: null,
      headerTitle: 'Select Element',
      type: '',
      label: '',
      ddList: ['Text', 'Dropdown'],
      display: []
    }
    this.chooseList = this.chooseList.bind(this)
  }

  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  chooseList(name){
    this.setState({ type: name })
  }

  addItem(){
    this.setState({display: [...this.state.display, {label: this.state.label, type: this.state.type}]});
  }


  render() {
    const{ listOpen, headerTitle, ddList, label, type } = this.state
    return (
      <React.Fragment>
      <div className='area-a' onClick={()=> this.handleClickOutside()}>

        <div className='element-wrapper'>
          <div className='label-header'> Type of element </div>
            <Dropdown list={ddList} headerTitle={headerTitle} listOpen={listOpen} chooseList={this.chooseList} />
        </div>

        <div className='label-wrapper'>
          <div className='label-header'> Element's Label </div>
        <input className="label-input" name='label' onChange={(e)=> this.onChange(e)} type="text"  placeholder="Enter label/name" />
        </div>
        <button onClick={()=> this.addItem()}> Add </button>
      </div>
      <div className='area-b' onClick={()=> this.handleClickOutside()}>
      { 
        this.state.display.map((item) => {
          return <div className='list-item'>
            <div className='item-label'>{item.label}</div>
            {
              item.type === 'Text'
              ? <input className="text-input" type="text"  placeholder="Enter text" />
              : <Dropdown list={['A', 'B', 'C']} headerTitle={'Select its value'} listOpen={listOpen} />
            }
          </div>
        })
      }
      </div>
      </React.Fragment>
    );
  }
}

export default AreaA;