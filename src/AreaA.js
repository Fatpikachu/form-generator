import React, { Component, useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';

const LOCAL_STORAGE_KEY = 'todos'
function AreaA() {
  const [listOpen, setListOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('Select Element');
  const [type, setType] = useState('');
  const [label, setLabel] = useState('');
  const [ddList, setDDList] = useState(['Text', 'Dropdown'])
  const [display, setDisplay] = useState([]);

  const theInputRef = useRef()
  
  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(stored) setDisplay(stored)
  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(display));
  }, [display])

  function handleClickOutside() {
    // this.setState({
    //   listOpen: false
    // })
    console.log('got inside here')
    setListOpen(false)
  }

  function onChange(e) {
    // this.setState({[e.target.name]: e.target.value});
    setLabel(theInputRef.current.value)
  }

  function chooseList(name) {
    // this.setState({ type: name })
    setType(name)
  }

  function addItem() {
    // this.refs['label-input'].value = ''
    // this.setState({display: [...this.state.display, {label: this.state.label, type: this.state.type}]});
    theInputRef.current.value = '';
    setDisplay(()=>{ return [...display, {label, type}] })
  }

    // const{ listOpen, headerTitle, ddList } = this.state
    return (
      <React.Fragment>
      <div className='area-a' onClick={handleClickOutside}>

        <div className='element-wrapper'>
          <div className='label-header'> Type of element </div>
            <Dropdown list={ddList} headerTitle={headerTitle} listOpen={listOpen} chooseList={chooseList} />
        </div>

        <div className='label-wrapper'>
          <div className='label-header'> Element's Label </div>
        <input ref={theInputRef} className='label-input' name='label' onChange={onChange} type="text"  placeholder="Enter label/name"  />
        </div>
        <button onClick={addItem}> Add </button>
      </div>
      <div className='area-b' onClick={handleClickOutside}>
      { 
        display.map((item, i) => {
          return <div className='list-item' key={i}>
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

export default AreaA;