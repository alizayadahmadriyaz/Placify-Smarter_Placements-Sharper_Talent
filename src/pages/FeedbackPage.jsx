import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, Brain, CheckCircle, AlertCircle } from 'lucide-react';
import { sendFeedbackEmail } from '../utils/emailService';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [testimonial, setTestimonial] = useState('');
  const [improvements, setImprovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const improvementOptions = [
    'Better camera quality',
    'More question variety', 
    'Mobile app version',
    'Practice mode',
    'Faster response time',
    'Better UI design'
  ];

  const handleImprovementToggle = (improvement) => {
    setImprovements(prev => 
      prev.includes(improvement)
        ? prev.filter(item => item !== improvement)
        : [...prev, improvement]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please provide a rating');
      return;
    }
    
    setLoading(true);
    setError('');

    const feedbackData = {
      name: 'Anonymous User', // You can add name field to form if needed
      email: '', // You can add email field to form if needed
      rating: rating,
      testimonial: testimonial,
      improvements: improvements,
      additionalFeedback: `Interview ID: ${localStorage.getItem('lastInterviewId') || 'direct-feedback'}`
    };

    try {
      const result = await sendFeedbackEmail(feedbackData);
      
      if (result.success) {
        setSubmitted(true);
        // Clear form
        setRating(0);
        setTestimonial('');
        setImprovements([]);
      } else {
        setError(result.message || 'Failed to send feedback. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your feedback has been sent to our team. We appreciate your input!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Submit Another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">Placify Feedback</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            How was your experience?
          </h2>
          <p className="text-gray-600">
            Your feedback helps us improve our AI interview platform
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Star Rating */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Overall Rating</h3>
            <div className="flex justify-center space-x-2">
              {[1,2,3,4,5].map(star => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star 
                    className={`w-10 h-10 ${
                      star <= rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            {rating > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-purple-600 font-medium mt-2"
              >
                {rating === 5 ? 'Excellent!' : 
                 rating === 4 ? 'Very Good!' :
                 rating === 3 ? 'Good' :
                 rating === 2 ? 'Fair' : 'Needs Improvement'}
              </motion.p>
            )}
          </div>

          {/* Testimonial */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tell us more (optional)</h3>
            <textarea
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              rows="4"
              className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Share your experience with Placify..."
              maxLength="500"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {testimonial.length}/500
            </div>
          </div>

          {/* Improvement Suggestions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">What would you improve?</h3>
            <div className="grid grid-cols-2 gap-3">
              {improvementOptions.map(option => (
                <motion.button
                  key={option}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleImprovementToggle(option)}
                  className={`p-3 text-left border-2 rounded-lg transition ${
                    improvements.includes(option)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <span className="text-sm font-medium">{option}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading || rating === 0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-purple-600 text-white py-4 px-6 rounded-xl font-semibold
                       hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500
                       disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Feedback</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackForm;
