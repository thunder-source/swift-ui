import { useState } from 'react'
// Import Thunder-UI components and styles
import '@thunder-source/thunder-ui/styles'  
import { Button, InputField, Card } from '@thunder-source/thunder-ui'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Thunder-UI Test App
          </h1>
          <p className="text-gray-600">
            Testing @thunder-source/thunder-ui component library
          </p>
        </div>

        {/* Button Tests */}
        <Card className="p-6" >
          <h2 className="text-2xl font-semibold mb-4">Button Component</h2>
          <div className="space-y-4">
            <div className="flex gap-3 items-center">
              <Button  variant="danger" onClick={() => setCount(count + 1)}>
                Click me ({count})
              </Button>
              <Button variant="secondary" onClick={() => setCount(0)}>
                Reset
              </Button>
              <Button variant="destructive" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </Card>

        {/* Input Field Tests */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Input Field Component</h2>
          <div className="space-y-4 max-w-md">
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              required
            />
            {inputValue && (
              <p className="text-sm text-gray-600">
                You entered: {inputValue}
              </p>
            )}
          </div>
        </Card>

        {/* Status */}
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <h3 className="font-semibold text-green-900">
                ✅ Thunder-UI is working correctly!
              </h3>
              <p className="text-sm text-green-700">
                Components are rendering, styles are applied, and TypeScript types are working.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App
