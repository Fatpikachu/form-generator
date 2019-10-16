import React, { Component } from 'react';
import FontAwesome from "react-fontawesome";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      type: '',
      headerTitle: '',
    }
  }

  toggleList(e){
    e.stopPropagation()
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  choose(title, e){
    this.toggleList(e)
    if(this.props.chooseList){
      this.props.chooseList(title)
    }
    this.setState({
      headerTitle: title,
    })
  }

  componentWillReceiveProps(nextProps) {
     this.setState({ listOpen: nextProps.listOpen });
  }

  render() {
    return (
      <div>
          <div className="dd-header-title" onClick={(e) => this.toggleList(e)}>
          {this.state.headerTitle || this.props.headerTitle}
            {this.state.listOpen
              ? <FontAwesome className='angle-up' name="angle-up" size="1x"/>
              : <FontAwesome className='angle-down'name="angle-down" size="1x"/>
            }
          </div>
          {this.state.listOpen && 
              this.props.list.map((item)=>
                <div className="dd-list-item" 
                    name={item} value={item.toLowerCase()} 
                    onClick={(e) => this.choose(item, e)}> {item} 
                </div>
              )
          }
      </div>
    );
  }
}

export default Dropdown;