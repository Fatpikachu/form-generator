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

  // componentDidUpdate(prevProps, prevState) {
  //   if(this.props.listOpen !== prevProps.listOpen ){
  //    this.setState({ listOpen: this.props.listOpen });
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    console.log('the next props: ', nextProps)
    this.setState({ listOpen: nextProps.listOpen });
 }

//   static getDerivedStateFromProps(nextProps, prevState) {
//     console.log("nextProps", nextProps, "\nprevState", prevState)
//     if(nextProps.listOpen === false){
//       return { listOpen: false }
//     }
//  }

  render() {
    console.log('drop down rendered and props are: ', this.props)
    return (
      <div>
          <div className="dd-header-title" onClick={(e) => this.toggleList(e)}>
          {this.state.headerTitle || this.props.headerTitle}
            {this.state.listOpen
              ? <FontAwesome className='angle-up' name="angle-up" />
              : <FontAwesome className='angle-down'name="angle-down" />
            }
          </div>
          {this.state.listOpen && 
              this.props.list.map((item, i)=>
                <div className="dd-list-item" 
                    name={item} value={item.toLowerCase()} 
                    onClick={(e) => this.choose(item, e)}
                    key={i}> 
                    {item} 
                </div>
              )
          }
      </div>
    );
  }
}

export default Dropdown;