import { Modal, ModalContent } from '@nextui-org/react'
import PropTypes from 'prop-types'
import React from 'react'
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory'
import { getChartData, isDesiredPosition } from './ChartModalUtils'
import { useTranslation } from 'react-i18next'

const ChartModal = ({ followersHistory, isOpen, onClose }) => {
  const chartData = getChartData(followersHistory)
  const { t } = useTranslation('edventure')
  return (
    <Modal
      data-testid='chart-modal'
      className='flex mr-[23px] center w-[90%]'
      isOpen={isOpen}
      onClose={onClose}
      isDismissable
    >
      <ModalContent className='flex pt-6 bg-gray-800'>
        {Object.keys(chartData).length <= 1 ? (
          <p className='center flex pb-4'>{t('NO_STATS_YET')}</p>
        ) : (
          <VictoryChart
            data-testid='victory-chart'
            width={600}
            height={400}
            scale={{ x: 'time' }}
          >
            <VictoryAxis
              style={{
                axisLabel: { fill: 'white' },
                axis: { fill: 'white', stroke: 'white' },
                ticks: { stroke: 'white' },
                tickLabels: {
                  fill: 'white',
                  padding: 5,
                  display: ({ index, ticks }) =>
                    isDesiredPosition(index, ticks.length) ? 'block' : 'none'
                }
              }}
            />
            <VictoryAxis
              label={t('FOLLOWERS')}
              dependentAxis
              tickFormat={t => Math.round(t)}
              style={{
                axisLabel: { padding: 30, fill: 'white' },
                axis: { fill: 'white', stroke: 'white' },
                ticks: { stroke: 'white' },
                tickLabels: { fill: 'white', padding: 5 }
              }}
            />
            <VictoryLine
              data={chartData}
              x='x'
              y='y'
              style={{
                data: { stroke: '#007bff' }
              }}
            />
          </VictoryChart>
        )}
      </ModalContent>
    </Modal>
  )
}

ChartModal.propTypes = {
  followersHistory: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default ChartModal
