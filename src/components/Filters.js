import React, {Component} from 'react';
import "../styles/Filters.css";

export class Filters extends Component {
  render() {
    const {currentFilter, onSelectFilter} = this.props;
    const newChildren = React.Children.map(this.props.children, (child) => {
      if(child.type === Filter) {
        return React.cloneElement(child, {
          isActive: child.props.name === currentFilter,
          onSelect: () => onSelectFilter(child.props.name)
        });
      } else {
        return child;
      }
    });
    return <div className="filters">{newChildren}</div>;
  }
}

export const Filter = ({name, isDisabled, isActive, onSelect}) => <button disabled={isDisabled} onClick={() => onSelect(name)} className={isActive ? 'active' : ''}>{name}</button>;