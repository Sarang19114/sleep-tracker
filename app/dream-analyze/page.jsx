'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { getAnalyze } from '../gemini2'

export default function DreamAnalysis() {
  const [dream, setDream] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const dreamAnalysis = await getAnalyze({
        type: 'dream_analysis',
        content: dream
      })
      setAnalysis(dreamAnalysis)
    } catch (error) {
      console.error('Error analyzing dream:', error)
      setAnalysis('Unable to analyze the dream at this time. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800 dark:text-gray-100">Dream Analysis</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Describe Your Dream</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Textarea
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              placeholder="Describe your dream here..."
              className="mb-4"
              rows={6}
            />
            <Button type="submit" disabled={loading || dream.trim() === ''}>
              {loading ? 'Analyzing...' : 'Analyze Dream'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Dream Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              {/* Use dangerouslySetInnerHTML to render HTML safely */}
              <div dangerouslySetInnerHTML={{ __html: analysis }} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
