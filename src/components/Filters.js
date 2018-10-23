import React, {Component} from 'react';
import "../styles/Filters.css";

export class Filters extends Component {
  render() {
    const {currentFilter, onSelectFilter} = this.props;
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        isActive: child.props.name === currentFilter,
        onSelect: () => onSelectFilter(child.props.name)
      });
    });
    return <div className="filters">{children}</div>;
  }
}

export const Filter = ({name, isActive, onSelect}) => <button onClick={() => onSelect(name)} className={isActive && 'active'}>{name}</button>;