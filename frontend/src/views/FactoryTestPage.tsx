import { useState } from 'react'
import { useFactory } from '../hooks/useFactory'
import { formatDate } from '../utils/formatHelper'

function FactoryTestPage() {
  const [factoryId, setFactoryId] = useState('2160')
  const { factory, loading, error } = useFactory(factoryId)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newId = formData.get('factoryId') as string
    setFactoryId(newId)
  }

  const formatTimeWindow = (window?: { startDate: string; endDate: string }) => {
    if (!window) return 'Not set'
    return `${formatDate(window.startDate)} - ${formatDate(window.endDate)}`
  }

  return (
    <div className='min-h-screen bg-dark-950 text-white p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-primary-300 mb-8'>Factory Test Page</h1>

        <form onSubmit={handleSubmit} className='mb-8 flex gap-4'>
          <input
            type='text'
            name='factoryId'
            defaultValue={factoryId}
            placeholder='Enter factory ID'
            className='flex-1 px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg focus:outline-none focus:border-primary-500'
          />
          <button
            type='submit'
            className='px-6 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors'
          >
            Fetch Factory
          </button>
        </form>

        {loading && (
          <div className='flex items-center justify-center p-8'>
            <div className='w-8 h-8 border-t-2 border-primary-500 rounded-full animate-spin'></div>
          </div>
        )}

        {error && (
          <div className='bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-300'>
            <h3 className='font-bold mb-2'>Error</h3>
            <p>{error.message}</p>
          </div>
        )}

        {factory && (
          <div className='space-y-6'>
            {/* Basic Information */}
            <div className='bg-dark-800 rounded-lg p-6 border border-dark-700'>
              <h2 className='text-xl font-bold text-primary-300 mb-4'>Basic Information</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm text-gray-400 mb-1'>ID</label>
                  <p className='text-lg'>{factory.id}</p>
                </div>
                <div>
                  <label className='block text-sm text-gray-400 mb-1'>Name</label>
                  <p className='text-lg'>{factory.metadata.content.name}</p>
                </div>
                <div>
                  <label className='block text-sm text-gray-400 mb-1'>Type</label>
                  <p className='text-lg'>{factory.type}</p>
                </div>
                <div>
                  <label className='block text-sm text-gray-400 mb-1'>Status</label>
                  <p className='text-lg'>{factory.status}</p>
                </div>
              </div>
            </div>

            {/* Stock Information */}
            <div className='bg-dark-800 rounded-lg p-6 border border-dark-700'>
              <h2 className='text-xl font-bold text-primary-300 mb-4'>Stock Information</h2>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm text-gray-400 mb-1'>Minted</label>
                  <p className='text-lg'>{factory.stock.minted}</p>
                </div>
                <div>
                  <label className='block text-sm text-gray-400 mb-1'>Total Supply</label>
                  <p className='text-lg'>{factory.stock.maxMintable}</p>
                </div>
                <div>
                  <label className='block text-sm text-gray-400 mb-1'>Available</label>
                  <p className='text-lg'>{factory.stock.mintable}</p>
                </div>
                <div>
                  <label className='block text-sm text-gray-400 mb-1'>Existing</label>
                  <p className='text-lg'>{factory.stock.existing}</p>
                </div>
                <div>
                  <label className='block text-sm text-gray-400 mb-1'>Authorized</label>
                  <p className='text-lg'>{factory.stock.authorized}</p>
                </div>
              </div>
            </div>

            {/* Time Windows */}
            <div className='bg-dark-800 rounded-lg p-6 border border-dark-700'>
              <h2 className='text-xl font-bold text-primary-300 mb-4'>Time Windows</h2>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm text-gray-400 mb-1'>Mintable Window</label>
                  <p className='text-lg'>{formatTimeWindow(factory.mintableWindow)}</p>
                </div>
                <div>
                  <label className='block text-sm text-gray-400 mb-1'>Trading Window</label>
                  <p className='text-lg'>{formatTimeWindow(factory.tradingWindow)}</p>
                </div>
                <div>
                  <label className='block text-sm text-gray-400 mb-1'>Transfer Window</label>
                  <p className='text-lg'>{formatTimeWindow(factory.transferWindow)}</p>
                </div>
              </div>
            </div>

            {/* Resale Information */}
            <div className='bg-dark-800 rounded-lg p-6 border border-dark-700'>
              <h2 className='text-xl font-bold text-primary-300 mb-4'>Resale Information</h2>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm text-gray-400 mb-1'>Minimum Price</label>
                  <p className='text-lg'>
                    {factory.resale.minimumPrice.amount} {factory.resale.minimumPrice.currency.symbol}
                  </p>
                </div>
                {factory.resale.shares.length > 0 && (
                  <div>
                    <label className='block text-sm text-gray-400 mb-1'>Shares</label>
                    <div className='space-y-2'>
                      {factory.resale.shares.map((share, index) => (
                        <div key={index} className='flex justify-between items-center'>
                          <span className='text-sm'>{share.receiver}</span>
                          <span className='text-sm'>{share.basisPoints / 100}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Media Preview */}
            {factory.metadata.content.medias?.square?.uri && (
              <div className='bg-dark-800 rounded-lg p-6 border border-dark-700'>
                <h2 className='text-xl font-bold text-primary-300 mb-4'>Media Preview</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm text-gray-400 mb-2'>Square Image</label>
                    <img 
                      src={factory.metadata.content.medias.square.uri} 
                      alt={factory.metadata.content.name}
                      className='w-48 h-48 object-cover rounded-lg'
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default FactoryTestPage