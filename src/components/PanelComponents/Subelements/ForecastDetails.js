import React, {Component, PropTypes} from 'react';
import ForecastDetailsTop from './ForecastDetailsTop';
import ForecastDetailsBottom from './ForecastDetailsBottom';
import ForecastingChart from 'components/Chart/ForecastingChart';
import createForecast from 'actions/APIForecast/createForecast';
import './ForecastDetails.scss';

export default class ForecastDetails extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    className: PropTypes.string,
    dateRange: PropTypes.object,
    selectedDate: PropTypes.string,
    incomeSummary: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dateRange && this.props.dateRange
      && nextProps.dateRange.endDate !== this.props.dateRange.endDate
      && nextProps.entity.api.plans.length) {
      const monthsDifference = Math.round(
        nextProps.dateRange.endDate
          .clone()
          .endOf('month')
          .diff(this.props.dateRange.endDate.clone().endOf('month'), 'months', true)
      );

      if (monthsDifference > 0) {
        for (let i = 1; i <= monthsDifference; i++) {
          createForecast(nextProps.entity, this.props.dateRange.endDate.clone().add(i, 'months'));
        }
      }
    }
  }

  render() {
    return (
      <div className={this.props.className || ''}>
        <ForecastDetailsTop incomeSummary={this.props.incomeSummary}
                            selectedDate={this.props.selectedDate}
                            dateRange={this.props.dateRange}
                            forecast={this.props.entity}
                            data={this.props.data}/>
        <ForecastingChart forecast={this.props.entity}
                          panelHeight={this.props.panelHeight}
                          dateRange={this.props.dateRange}
                          selectedDate={this.props.selectedDate}
                          expanded={this.props.expanded}
                          data={this.props.data}/>
        {
          this.props.incomeSummary.length > 0 && (
            <ForecastDetailsBottom selectedDate={this.props.selectedDate}
                                   incomeSummary={this.props.incomeSummary}
                                   data={this.props.data}/>
          )
        }
      </div>
    );
  }
}
