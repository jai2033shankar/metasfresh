import counterpart from 'counterpart';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Map } from 'immutable';

import _ from 'lodash';

import TableCell from '../table/TableCell';
import FiltersFrequent from './FiltersFrequent';
import FiltersNotFrequent from './FiltersNotFrequent';

class Filters extends Component {
  state = {
    activeFilter: null,
    activeFiltersCaptions: null,
    notValidFields: null,
    widgetShown: false,
  };

  componentWillReceiveProps(nextProps) {
    this.parseActiveFilters();
  }

  componentDidMount() {
    this.parseActiveFilters();
  }

  // PARSING FILTERS ---------------------------------------------------------
  parseActiveFilters = (cb) => {
    let { filtersActive, filterData, initialValuesNulled } = this.props;
    let activeFilters = _.cloneDeep(filtersActive);
    let filtersData = Map(filterData);
    const activeFiltersCaptions = {};

    console.info('PARSEACTIVE: ', activeFilters.toJSON(), _.cloneDeep(filtersActive.toJS()));

    // find any filters with default values first and extend
    // activeFilters with them
    filtersData.forEach((filter, filterId) => {
      if (filter.parameters) {
        let paramsArray = [];

        outerParameters: for (let parameter of filter.parameters) {
          const { defaultValue, parameterName } = parameter;
          const nulledFilter = initialValuesNulled.get(filterId);

          if (defaultValue && (!activeFilters || !activeFilters.size)) {
            activeFilters = Map({
              [`${filterId}`]: {
                filterId,
                parameters: [],
              },
            });
          }

          const isActive = activeFilters.has(filterId);

          if (!defaultValue || (nulledFilter && nulledFilter.has(parameterName))) {
            // console.log('filterActive1: ', isActive, activeFilters.get(filterId), parameterName);
            if (isActive) {
              activeFilters = activeFilters.set(filterId, {
                defaultVal: false,
                filterId,
                parameters: activeFilters.get(filterId).parameters,
              });
            }
            continue;
          }

          if (isActive) {
            //look for existing parameterName in parameters array
            // skip if found as they override defaultValue ALWAYS
            const filterActive = activeFilters.get(filterId);
            // console.log('filterActive2: ', isActive, filterActive, parameterName);

            if (filterActive.parameters) {
              for (let activeParameter of filterActive.parameters) {
                if (activeParameter.parameterName === parameterName) {
                  continue outerParameters;
                }
              }
            }
          }

          const singleActiveFilter = activeFilters.get(filterId);
          paramsArray = singleActiveFilter ? singleActiveFilter.parameters : [];

          console.log('adding to active: ', parameterName, _.cloneDeep(activeFilters))

          activeFilters = activeFilters.set(filterId, {
            filterId,
            defaultVal: singleActiveFilter && singleActiveFilter.defaultVal !== undefined ? singleActiveFilter.defaultVal : true,
            parameters: [
              ...paramsArray,
              {
                parameterName,
                value: defaultValue,
                defaultValue: defaultValue,
              },
            ],
          });
        }
      } else {
        activeFilters = activeFilters.delete(filterId);
      }
    });

    if (activeFilters.size) {
      activeFilters.forEach((filter, filterId) => {
        const captionsArray = ['', ''];

        filter.parameters.forEach(filterParameter => {
          const { value, parameterName, defaultValue } = filterParameter;

          if (!defaultValue) {
            const parentFilter = filtersData.get(filterId);
            const filterParameter = parentFilter.parameters.find(
              param => param.parameterName === parameterName
            );
            let captionName = filterParameter.caption;
            let itemCaption = filterParameter.caption;

            switch (filterParameter.widgetType) {
              case 'Text':
                captionName = value;

                if (!value) {
                  captionName = '';
                  itemCaption = '';
                }
                break;
              case 'Lookup':
              case 'List':
                captionName = value && value.caption;
                break;
              case 'Labels':
                captionName = value.values.reduce((caption, item) => {
                  return `${caption}, ${item.caption}`;
                }, '');
                break;
              case 'YesNo':
              case 'Switch':
              default:
                if (!value) {
                  captionName = '';
                  itemCaption = '';
                }
                break;
            }

            if (captionName) {
              captionsArray[0] = captionsArray[0]
                ? `${captionsArray[0]}, ${captionName}`
                : captionName;
            }

            if (itemCaption) {
              captionsArray[1] = captionsArray[1]
                ? `${captionsArray[1]}, ${itemCaption}`
                : itemCaption;
            }
          }
        });

        if (captionsArray.join('').length) {
          activeFiltersCaptions[filterId] = captionsArray;
        }
      });

      console.info('ACTIVE: ',  _.cloneDeep(activeFilters), _.cloneDeep(filtersActive));

      this.setState({
        activeFilter: activeFilters.toIndexedSeq().toArray(),
        activeFiltersCaptions,
      }, () => cb && cb());
    } else {
      this.setState({
        activeFilter: null,
        activeFiltersCaptions: null,
      }, () => cb && cb());
    }
  };

  sortFilters = data => {
    return {
      frequentFilters: this.annotateFilters(
        data
          .filter(filter => filter.frequent)
          .toIndexedSeq()
          .toArray()
      ),
      notFrequentFilters: this.annotateFilters(
        data
          .filter(filter => !filter.frequent && !filter.static)
          .toIndexedSeq()
          .toArray()
      ),
      staticFilters: this.annotateFilters(data.filter(filter => filter.static))
        .toIndexedSeq()
        .toArray(),
    };
  };

  isFilterValid = filters => {
    if (filters.parameters) {
      return !filters.parameters.filter(item => item.mandatory && !item.value)
        .length;
    }

    return true;
  };

  isFilterActive = filterId => {
    const { activeFilter } = this.state;

    if (activeFilter) {
      const active = activeFilter.find(
        item => item.filterId === filterId && !item.defaultVal
      );

      return typeof active !== 'undefined';
    }

    return false;
  };

  parseToPatch = params => {
    // return params.map(param => {
    //   let value = null;

    //   if (!param.defaultValue || param.defaultValue !== param.value) {
    //     value = param.value === '' ? null : param.value;
    //   }

    //   return {
    //     ...param,
    //     value,
    //   };
    // });
    // console.log('PARSETOPATCH: ', params)

    return params.reduce((acc, param) => {
      // let value = null;

      if (
        !param.defaultValue ||
        JSON.stringify(param.defaultValue) !== JSON.stringify(param.value)
      ) {
        // console.log('PARSE: ', {...param})
        // value = param.value === '' ? null : param.value;
        acc.push({
          ...param,
          value: param.value === '' ? null : param.value,
        });
      }

      // return {
      //   ...param,
      //   value,
      // };
      return acc;
    }, []);
  };

  // SETTING FILTERS  --------------------------------------------------------

  /*
     *   This method should update docList
     */
  // eslint-disable-next-line no-unused-vars
  applyFilters = ({ isActive, captionValue, ...filter }, cb) => {
    const valid = this.isFilterValid(filter);

    this.setState(
      {
        notValidFields: !valid,
      },
      () => {
        if (valid) {
          const parsedFilter = filter.parameters
            ? {
                ...filter,
                parameters: this.parseToPatch(filter.parameters),
              }
            : filter;

          this.setFilterActive(parsedFilter);

          cb && cb();
        }
      }
    );
  };

  setFilterActive = filterToAdd => {
    const { updateDocList } = this.props;

    let { filtersActive } = this.props;
    let activeFilters = Map(filtersActive);

    activeFilters = activeFilters.filter((item, id) => id !== filterToAdd.filterId)
    activeFilters = activeFilters.set(filterToAdd.filterId, filterToAdd);

    updateDocList(activeFilters);
  };

  /*
     *  Method to lock backdrop, to do not close on click onClickOutside
     *  widgets that are bigger than filter wrapper
     */
  handleShow = value => {
    this.setState({
      widgetShown: value,
    });
  };

  clearFilters = filterToClear => {
    const { updateDocList } = this.props;

    let { filtersActive } = this.props;
    let activeFilters = Map(filtersActive);

    if (filtersActive.size) {
      activeFilters = activeFilters.filter((item, id) => id !== filterToClear.filterId)
      updateDocList(activeFilters);
    }
  };

  dropdownToggled = () => {
    this.setState({
      notValidFields: false,
    });
  };

  annotateFilters = unannotatedFilters => {
    const { activeFilter } = this.state;

    return unannotatedFilters.map(unannotatedFilter => {
      const parameter =
        unannotatedFilter.parameters && unannotatedFilter.parameters[0];
      const filterType = parameter && parameter.widgetType;
      const isActive = this.isFilterActive(unannotatedFilter.filterId);
      const currentFilter = activeFilter
        ? activeFilter.find(f => f.filterId === unannotatedFilter.filterId)
        : null;
      const activeParameter =
        parameter && isActive && currentFilter && currentFilter.parameters[0];
      const captionValue = activeParameter
        ? TableCell.fieldValueToString(
            activeParameter.valueTo
              ? [activeParameter.value, activeParameter.valueTo]
              : activeParameter.value,
            filterType
          )
        : '';

      return {
        ...unannotatedFilter,
        captionValue,
        isActive,
      };
    });
  };

  // RENDERING FILTERS -------------------------------------------------------

  render() {
    const { filterData, windowType, viewId, resetInitialValues } = this.props;
    const { frequentFilters, notFrequentFilters } = this.sortFilters(
      filterData
    );
    const {
      notValidFields,
      widgetShown,
      activeFilter,
      activeFiltersCaptions,
    } = this.state;

    return (
      <div
        className="filter-wrapper js-not-unselect"
        ref={c => (this.filtersWrapper = c)}
      >
        <span className="filter-caption">
          {`${counterpart.translate('window.filters.caption')}: `}
        </span>
        <div className="filter-wrapper">
          {!!frequentFilters.length && (
            <FiltersFrequent
              {...{
                activeFiltersCaptions,
                windowType,
                notValidFields,
                viewId,
                widgetShown,
              }}
              data={frequentFilters}
              handleShow={this.handleShow}
              applyFilters={this.applyFilters}
              clearFilters={this.clearFilters}
              active={activeFilter}
              dropdownToggled={this.dropdownToggled}
              filtersWrapper={this.filtersWrapper}
            />
          )}
          {!!notFrequentFilters.length && (
            <FiltersNotFrequent
              {...{
                activeFiltersCaptions,
                windowType,
                notValidFields,
                viewId,
                widgetShown,
                resetInitialValues,
              }}
              data={notFrequentFilters}
              handleShow={this.handleShow}
              applyFilters={this.applyFilters}
              clearFilters={this.clearFilters}
              active={activeFilter}
              dropdownToggled={this.dropdownToggled}
              filtersWrapper={this.filtersWrapper}
            />
          )}
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  windowType: PropTypes.string.isRequired,
  resetInitialValues: PropTypes.func.isRequired,

  // this should be an immutable Map
  filtersActive: PropTypes.any,
  initialValuesNulled: PropTypes.any,
};

export default Filters;
