import PropTypes from 'prop-types'
import { Input, Select, SelectItem, Radio, RadioGroup } from '@nextui-org/react'
import { SearchIcon } from '../Navbar'
import Constants from '../../constants'
import { useTranslation } from 'react-i18next'
import React from 'react'

const EventFilter = ({
  handleSearchChange,
  handleFilterChange,
  handleFilterOtherChange,
  ownerOption
}) => {
  const { t } = useTranslation('edventure')

  return (
    <div className='flex flex-responsive-2 justify-between gap-2 items-center'>
      <div className='flex-responsive gap-3'>
        <Input
          data-testid='FILTER_SEARCH'
          startContent={
            <div className='flex gap-1'>
              <SearchIcon />
            </div>
          }
          placeholder={t('SEARCH_NAME')}
          onChange={e => handleSearchChange(e.target.value)}
        />
        <Select
          data-testid='FILTER_TYPE'
          selectionMode='multiple'
          aria-label='type-select'
          placeholder={t('SEARCH_TYPE')}
          onChange={value => handleFilterChange(value)}
          className='ml-2 rounded-md'
        >
          {Constants.EVENT_TYPES.map(type => (
            <SelectItem data-testid={type} key={type} value={type}>
              {t(type)}
            </SelectItem>
          ))}
        </Select>
      </div>
      <RadioGroup
        defaultValue='ALL'
        onChange={handleFilterOtherChange}
        orientation='horizontal'
      >
        <div className='align-start flex-responsive gap-2'>
          <Radio data-testid='FILTER_ALL' value='ALL'>
            {t('ALL')}
          </Radio>
          <Radio data-testid='FILTER_FOLLOWING' value='FOLLOWING'>
            {t('FOLLOWING')}
          </Radio>
          {ownerOption ? (
            <Radio data-testid='FILTER_OWNER' value='OWNER'>
              {t('OWNER')}
            </Radio>
          ) : (
            <Radio data-testid='FILTER_NOT_FOLLOWING' value='NOT_FOLLOWING'>
              {t('NOT_FOLLOWING')}
            </Radio>
          )}
        </div>
      </RadioGroup>
    </div>
  )
}

EventFilter.propTypes = {
  handleFilterChange: PropTypes.func,
  handleFilterOtherChange: PropTypes.func,
  handleSearchChange: PropTypes.func,
  ownerOption: PropTypes.bool
}

export default EventFilter
