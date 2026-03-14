import React, { useState, useRef, useEffect } from 'react';
import { flightService, bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your flight booking assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { user, isAuthenticated } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(async () => {
      const response = await generateResponse(input.toLowerCase());
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = async (query) => {
    try {
      // Check if user is authenticated for personalized queries
      if (!isAuthenticated) {
        return "Please log in to access personalized flight information and booking details.";
      }

      // Normalize query for better matching
      const normalizedQuery = query.toLowerCase().trim();

      // Extract city names from query (case insensitive)
      const cityPattern = /\b(?:from|to|departing|arriving|leaving|going|depart|arrive|fly|travel)\s+([a-zA-Z\s]+?)(?:\s|$|to|from|departing|arriving|leaving|going|depart|arrive|fly|travel)/gi;
      const cities = [];
      let match;
      while ((match = cityPattern.exec(normalizedQuery)) !== null) {
        cities.push(match[1].trim());
      }

      // Question 1: How many flights available from [City] - Enhanced patterns
      if ((normalizedQuery.includes('how many') || normalizedQuery.includes('number of') || normalizedQuery.includes('count') || normalizedQuery.includes('total')) && 
          (normalizedQuery.includes('flight') || normalizedQuery.includes('flights') || normalizedQuery.includes('ticket') || normalizedQuery.includes('tickets')) && 
          (normalizedQuery.includes('from') || normalizedQuery.includes('departing') || normalizedQuery.includes('leaving') || normalizedQuery.includes('available') || normalizedQuery.includes('there')) && 
          cities.length > 0) {
        const departureCity = cities[0];
        try {
          const flights = await flightService.getAllFlights({ departureCity });
          const count = flights.data.flights.length;
          if (count === 0) {
            return `Sorry, there are currently no flights available from ${departureCity}. Please try a different city or check back later.`;
          }
          return `We have ${count} flight${count > 1 ? 's' : ''} available from ${departureCity}. You can view them on the Flights page by searching for flights departing from ${departureCity}.`;
        } catch (error) {
          return `I couldn't retrieve flight information for ${departureCity} right now. Please try again later or check the Flights page directly.`;
        }
      }

      // Question: How many tickets confirmed and name of passenger
      if ((normalizedQuery.includes('how many') || normalizedQuery.includes('number of') || normalizedQuery.includes('count')) && 
          (normalizedQuery.includes('ticket') || normalizedQuery.includes('tickets') || normalizedQuery.includes('booking') || normalizedQuery.includes('bookings')) && 
          (normalizedQuery.includes('confirmed') || normalizedQuery.includes('confirm')) && 
          (normalizedQuery.includes('passenger') || normalizedQuery.includes('passengers') || normalizedQuery.includes('name') || normalizedQuery.includes('names'))) {
        try {
          const bookings = await bookingService.getUserBookings();
          const confirmedBookings = bookings.data.bookings.filter(booking => booking.status === 'confirmed');
          
          if (confirmedBookings.length === 0) {
            return "You don't have any confirmed tickets at the moment. You can book flights from the Flights page.";
          }
          
          let response = `You have ${confirmedBookings.length} confirmed ticket${confirmedBookings.length > 1 ? 's' : ''}.\n\n`;
          response += `Passenger names from your confirmed bookings:\n\n`;
          
          confirmedBookings.forEach((booking, index) => {
            const flight = booking.flightId;
            response += `Booking ${index + 1}: ${flight?.departureCity} → ${flight?.arrivalCity}\n`;
            response += `Passengers:\n`;
            
            booking.passengers.forEach((passenger, pIndex) => {
              response += `  ${pIndex + 1}. ${passenger.name}`;
              if (passenger.seatNumber) response += ` (Seat: ${passenger.seatNumber})`;
              response += '\n';
            });
            response += '\n';
          });
          
          response += "You can view full details and download tickets from the Bookings page.";
          return response;
        } catch (error) {
          return "I couldn't access your booking information right now. Please try again later or check your Bookings page directly.";
        }
      }
      // Question 2: How many flights/tickets I have cancelled - Enhanced
      if ((normalizedQuery.includes('how many') || normalizedQuery.includes('number of') || normalizedQuery.includes('count')) && 
          (normalizedQuery.includes('cancelled') || normalizedQuery.includes('canceled') || normalizedQuery.includes('cancel')) && 
          (normalizedQuery.includes('i have') || normalizedQuery.includes('my') || normalizedQuery.includes('booking') || normalizedQuery.includes('bookings') || normalizedQuery.includes('ticket') || normalizedQuery.includes('tickets'))) {
        try {
          const bookings = await bookingService.getUserBookings();
          const cancelledBookings = bookings.data.bookings.filter(booking => booking.status === 'cancelled');
          const count = cancelledBookings.length;
          
          if (count === 0) {
            return "You haven't cancelled any bookings yet. All your current bookings are active.";
          }
          
          return `You have cancelled ${count} booking${count > 1 ? 's' : ''}. You can view all your bookings, including cancelled ones, on the Bookings page.`;
        } catch (error) {
          return "I couldn't access your booking information right now. Please try again later or check your Bookings page directly.";
        }
      }

      // Question 3: Which type of member I am / membership type - Enhanced
      if ((normalizedQuery.includes('member') || normalizedQuery.includes('membership') || normalizedQuery.includes('type') || normalizedQuery.includes('plan') || normalizedQuery.includes('account')) && 
          (normalizedQuery.includes('i am') || normalizedQuery.includes('my') || normalizedQuery.includes('what') || normalizedQuery.includes('which') || normalizedQuery.includes('what type') || normalizedQuery.includes('what kind'))) {
        const memberType = user?.role === 'prime' ? 'Prime Member' : 'Standard Member';
        const benefits = user?.role === 'prime' 
          ? 'You have access to exclusive offers, discounts, and special deals!'
          : 'You can upgrade to Prime membership to unlock exclusive offers and discounts.';
        
        return `You are a ${memberType}. ${benefits}`;
      }

      // Question: List confirmed bookings - Enhanced
      if ((normalizedQuery.includes('list') || normalizedQuery.includes('show') || normalizedQuery.includes('what are') || normalizedQuery.includes('tell me') || normalizedQuery.includes('give me')) && 
          (normalizedQuery.includes('confirmed') || normalizedQuery.includes('confirm')) && 
          (normalizedQuery.includes('booking') || normalizedQuery.includes('bookings') || normalizedQuery.includes('ticket') || normalizedQuery.includes('tickets'))) {
        try {
          const bookings = await bookingService.getUserBookings();
          const confirmedBookings = bookings.data.bookings.filter(booking => booking.status === 'confirmed');
          
          if (confirmedBookings.length === 0) {
            return "You don't have any confirmed bookings at the moment. You can book flights from the Flights page.";
          }
          
          let response = `You have ${confirmedBookings.length} confirmed booking${confirmedBookings.length > 1 ? 's' : ''}:\n\n`;
          
          confirmedBookings.forEach((booking, index) => {
            const flight = booking.flightId;
            const departureDate = new Date(flight?.departureTime).toLocaleDateString();
            response += `${index + 1}. ${flight?.airline} - ${flight?.departureCity} to ${flight?.arrivalCity}\n`;
            response += `   Date: ${departureDate}\n`;
            response += `   Passengers: ${booking.numberOfPassengers}\n`;
            response += `   Reference: ${booking.bookingReference}\n\n`;
          });
          
          response += "You can view full details and download tickets from the Bookings page.";
          return response;
        } catch (error) {
          return "I couldn't access your booking information right now. Please try again later or check your Bookings page directly.";
        }
      }

      // Question: Name of passengers in cancelled/confirmed bookings - Enhanced
      if ((normalizedQuery.includes('passenger') || normalizedQuery.includes('passengers') || normalizedQuery.includes('name') || normalizedQuery.includes('names') || normalizedQuery.includes('who')) && 
          (normalizedQuery.includes('cancelled') || normalizedQuery.includes('canceled') || normalizedQuery.includes('confirmed') || normalizedQuery.includes('confirm')) && 
          (normalizedQuery.includes('booking') || normalizedQuery.includes('bookings') || normalizedQuery.includes('ticket') || normalizedQuery.includes('tickets'))) {
        try {
          const bookings = await bookingService.getUserBookings();
          const status = normalizedQuery.includes('cancelled') || normalizedQuery.includes('canceled') ? 'cancelled' : 'confirmed';
          const filteredBookings = bookings.data.bookings.filter(booking => booking.status === status);
          
          if (filteredBookings.length === 0) {
            return `You don't have any ${status} bookings.`;
          }
          
          let response = `Here are the passenger names from your ${status} bookings:\n\n`;
          
          filteredBookings.forEach((booking, index) => {
            const flight = booking.flightId;
            response += `Booking ${index + 1}: ${flight?.departureCity} → ${flight?.arrivalCity} (${flight?.airline})\n`;
            response += `Reference: ${booking.bookingReference}\n`;
            response += `Passengers:\n`;
            
            booking.passengers.forEach((passenger, pIndex) => {
              response += `  ${pIndex + 1}. ${passenger.name}`;
              if (passenger.seatNumber) response += ` (Seat: ${passenger.seatNumber})`;
              response += '\n';
            });
            response += '\n';
          });
          
          return response;
        } catch (error) {
          return "I couldn't access your booking details right now. Please try again later or check your Bookings page directly.";
        }
      }

      // General booking questions
      if (query.includes('book') || query.includes('booking')) {
        return "To book a flight, go to the Flights page, search for your desired route, select a flight, and follow the booking process. You can book up to 6 passengers at once!";
      }

      // General booking status questions
      if ((query.includes('my booking') || query.includes('bookings') || query.includes('status')) && 
          !query.includes('cancelled') && !query.includes('confirmed') && !query.includes('how many')) {
        try {
          const bookings = await bookingService.getUserBookings();
          const allBookings = bookings.data.bookings;
          
          if (allBookings.length === 0) {
            return "You don't have any bookings yet. You can start booking flights from the Flights page.";
          }
          
          const confirmed = allBookings.filter(b => b.status === 'confirmed').length;
          const cancelled = allBookings.filter(b => b.status === 'cancelled').length;
          const pending = allBookings.filter(b => b.status === 'pending').length;
          
          let response = `You have ${allBookings.length} total booking${allBookings.length > 1 ? 's' : ''}:\n`;
          if (confirmed > 0) response += `• ${confirmed} confirmed\n`;
          if (pending > 0) response += `• ${pending} pending\n`;
          if (cancelled > 0) response += `• ${cancelled} cancelled\n`;
          
          response += "\nYou can view all details on the Bookings page.";
          return response;
        } catch (error) {
          return "I couldn't access your booking information right now. Please check your Bookings page directly.";
        }
      }

      // General flight availability
      if ((query.includes('available') || query.includes('flights')) && !query.includes('from')) {
        try {
          const flights = await flightService.getAllFlights();
          const count = flights.data.flights.length;
          return `We currently have ${count} flights available across all routes. You can search for specific routes on the Flights page using our search filters.`;
        } catch (error) {
          return "I couldn't retrieve flight information right now. Please check the Flights page directly.";
        }
      }

      // Price/cost questions
      if (query.includes('price') || query.includes('cost') || query.includes('cheap') || query.includes('expensive')) {
        return "Flight prices vary based on route, airline, and demand. You can sort flights by price on the Flights page to find the most affordable options.";
      }

      // Offers/discounts
      if (query.includes('offer') || query.includes('discount') || query.includes('deal')) {
        if (user?.role === 'prime') {
          return "As a Prime member, you have access to exclusive offers and discounts! Check out our Offers page for holiday specials, early bird discounts, and family packages.";
        } else {
          return "Our Prime members get access to exclusive offers and discounts. Check out our Offers page to see what's available, or consider upgrading to Prime membership!";
        }
      }

      // Specific booking by reference
      if (query.includes('booking') && (query.includes('reference') || /\b[A-Z0-9]{6,}\b/.test(query))) {
        // Extract potential booking reference (assuming it's alphanumeric and reasonably long)
        const refMatch = query.match(/\b([A-Z0-9]{6,})\b/);
        if (refMatch) {
          const bookingRef = refMatch[1];
          try {
            const bookings = await bookingService.getUserBookings();
            const booking = bookings.data.bookings.find(b => b.bookingReference === bookingRef);
            
            if (!booking) {
              return `I couldn't find a booking with reference ${bookingRef}. Please check the reference and try again, or view all your bookings on the Bookings page.`;
            }
            
            const flight = booking.flightId;
            const departureDate = new Date(flight?.departureTime).toLocaleDateString();
            const status = booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
            
            let response = `Booking Details for ${bookingRef}:\n\n`;
            response += `Flight: ${flight?.airline} - ${flight?.departureCity} to ${flight?.arrivalCity}\n`;
            response += `Date: ${departureDate}\n`;
            response += `Status: ${status}\n`;
            response += `Passengers: ${booking.numberOfPassengers}\n`;
            response += `Total Price: ₹${booking.totalPrice.toLocaleString()}\n\n`;
            
            if (booking.passengers && booking.passengers.length > 0) {
              response += `Passenger Details:\n`;
              booking.passengers.forEach((passenger, index) => {
                response += `${index + 1}. ${passenger.name}`;
                if (passenger.seatNumber) response += ` (Seat: ${passenger.seatNumber})`;
                response += '\n';
              });
            }
            
            return response;
          } catch (error) {
            return "I couldn't access your booking details right now. Please try again later or check your Bookings page directly.";
          }
        }
      }

      // Upcoming flights/bookings
      if ((query.includes('upcoming') || query.includes('next') || query.includes('future')) && 
          (query.includes('flight') || query.includes('booking'))) {
        try {
          const bookings = await bookingService.getUserBookings();
          const upcomingBookings = bookings.data.bookings
            .filter(booking => booking.status === 'confirmed')
            .filter(booking => new Date(booking.flightId?.departureTime) > new Date())
            .sort((a, b) => new Date(a.flightId?.departureTime) - new Date(b.flightId?.departureTime));
          
          if (upcomingBookings.length === 0) {
            return "You don't have any upcoming confirmed flights. You can book new flights from the Flights page.";
          }
          
          const nextBooking = upcomingBookings[0];
          const flight = nextBooking.flightId;
          const departureDate = new Date(flight?.departureTime).toLocaleDateString();
          const departureTime = new Date(flight?.departureTime).toLocaleTimeString();
          
          let response = `Your next flight is:\n\n`;
          response += `${flight?.airline} - ${flight?.departureCity} to ${flight?.arrivalCity}\n`;
          response += `Date: ${departureDate} at ${departureTime}\n`;
          response += `Duration: ${flight?.duration}\n`;
          response += `Passengers: ${nextBooking.numberOfPassengers}\n`;
          response += `Reference: ${nextBooking.bookingReference}\n\n`;
          
          if (upcomingBookings.length > 1) {
            response += `You have ${upcomingBookings.length - 1} more upcoming flight${upcomingBookings.length - 1 > 1 ? 's' : ''}.`;
          }
          
          return response;
        } catch (error) {
          return "I couldn't access your upcoming flight information right now. Please check your Bookings page directly.";
        }
      }

      // Question: How do I book a flight? / How to book?
      if ((normalizedQuery.includes('how do i') || normalizedQuery.includes('how to') || normalizedQuery.includes('how can i')) && 
          (normalizedQuery.includes('book') || normalizedQuery.includes('booking') || normalizedQuery.includes('reserve') || normalizedQuery.includes('get')) && 
          (normalizedQuery.includes('flight') || normalizedQuery.includes('ticket'))) {
        return `To book a flight:\n\n1. Go to the Flights page\n2. Select your departure and arrival cities\n3. Choose your travel dates\n4. Pick a flight from the available options\n5. Fill in passenger details\n6. Complete the payment\n\nYou can also check out our special offers on the Offers page!`;
      }

      // Question: What flights are available? / Show me flights
      if ((normalizedQuery.includes('what') || normalizedQuery.includes('show') || normalizedQuery.includes('list') || normalizedQuery.includes('available')) && 
          normalizedQuery.includes('flight') && 
          !normalizedQuery.includes('from') && !normalizedQuery.includes('to')) {
        return `To see available flights:\n\n1. Click on "Flights" in the navigation menu\n2. Enter your departure city (or select from suggestions)\n3. Enter your arrival city\n4. Select your travel date\n5. Click "Search Flights"\n\nWe have flights to many international destinations!`;
      }

      // Question: How much does it cost? / Price information
      if ((normalizedQuery.includes('how much') || normalizedQuery.includes('cost') || normalizedQuery.includes('price') || normalizedQuery.includes('expensive') || normalizedQuery.includes('cheap')) && 
          (normalizedQuery.includes('flight') || normalizedQuery.includes('ticket') || normalizedQuery.includes('booking'))) {
        return `Flight prices vary depending on:\n\n• Route and distance\n• Airline and class\n• Time of booking\n• Season and demand\n\nPrices typically range from $50 to $1,200 for economy flights. Check our Offers page for current deals and discounts!`;
      }

      // Question: Can I cancel my booking? / Cancellation policy
      if ((normalizedQuery.includes('can i') || normalizedQuery.includes('how to') || normalizedQuery.includes('cancel') || normalizedQuery.includes('cancellation')) && 
          (normalizedQuery.includes('booking') || normalizedQuery.includes('ticket') || normalizedQuery.includes('reservation'))) {
        return `Yes, you can cancel bookings, but policies vary:\n\n• Most airlines allow cancellations up to 24 hours before departure\n• Cancellation fees may apply\n• Refunds are processed within 5-10 business days\n• Check your specific booking details for exact terms\n\nContact support if you need help with a cancellation.`;
      }

      // Question: How do I get my ticket? / Download ticket
      if ((normalizedQuery.includes('how do i') || normalizedQuery.includes('how to') || normalizedQuery.includes('get') || normalizedQuery.includes('download') || normalizedQuery.includes('print')) && 
          (normalizedQuery.includes('ticket') || normalizedQuery.includes('boarding pass'))) {
        return `To get your ticket:\n\n1. Go to your Bookings page\n2. Find your confirmed booking\n3. Click the "Download Ticket" button\n4. Your ticket will be downloaded as a PDF\n5. Print it or save it on your phone\n\nMake sure to arrive at the airport 2-3 hours before departure!`;
      }

      // Question: What is my membership type? / Member status
      if ((normalizedQuery.includes('what') || normalizedQuery.includes('my') || normalizedQuery.includes('membership') || normalizedQuery.includes('member') || normalizedQuery.includes('status') || normalizedQuery.includes('type')) && 
          (normalizedQuery.includes('membership') || normalizedQuery.includes('member') || normalizedQuery.includes('status') || normalizedQuery.includes('type'))) {
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          if (user && user.membershipType) {
            return `Your membership type is: ${user.membershipType}\n\nAs a ${user.membershipType} member, you get exclusive benefits and priority booking!`;
          } else {
            return "I couldn't retrieve your membership information. Please check your Profile page.";
          }
        } catch (error) {
          return "I couldn't access your membership details. Please check your Profile page.";
        }
      }

      // Question: How many flights from [city]?
      if ((normalizedQuery.includes('how many') || normalizedQuery.includes('number of') || normalizedQuery.includes('count')) && 
          normalizedQuery.includes('flight') && 
          (normalizedQuery.includes('from') || normalizedQuery.includes('departing'))) {
        const cityMatch = normalizedQuery.match(/(?:from|departing)\s+([a-zA-Z\s]+)/i);
        if (cityMatch) {
          const city = cityMatch[1].trim();
          try {
            const flights = await flightService.getAllFlights();
            const cityFlights = flights.data.flights.filter(flight => 
              flight.departureCity.toLowerCase().includes(city.toLowerCase())
            );
            
            if (cityFlights.length === 0) {
              return `I couldn't find any flights departing from ${city}. Please check the city name or try our Flights page for available destinations.`;
            }
            
            return `There are ${cityFlights.length} flight${cityFlights.length > 1 ? 's' : ''} departing from ${city}. Popular destinations include: ${[...new Set(cityFlights.map(f => f.arrivalCity))].slice(0, 5).join(', ')}`;
          } catch (error) {
            return "I couldn't check flight availability right now. Please try again later.";
          }
        }
      }

      // Question: Help / What can you do?
      if (normalizedQuery.includes('help') || normalizedQuery.includes('what can you') || normalizedQuery.includes('commands') || normalizedQuery.includes('features')) {
        return `I can help you with:\n\n• Booking flights and checking availability\n• Viewing your bookings and ticket status\n• Downloading tickets as PDF\n• Checking offers and special deals\n• Answering questions about flight policies\n• Providing information about your membership\n\nTry asking me things like:\n- "Show me flights from New York"\n- "How many confirmed bookings do I have?"\n- "What offers are available?"\n- "How do I cancel a booking?"`;
      }

      // Question: About the app / What is this?
      if (normalizedQuery.includes('about') || normalizedQuery.includes('what is') || normalizedQuery.includes('this app') || normalizedQuery.includes('application')) {
        return `This is a comprehensive flight booking system where you can:\n\n• Search and book international flights\n• View special offers and discounts\n• Manage your bookings and download tickets\n• Track your travel history\n• Enjoy member benefits and priority service\n\nWe offer flights to destinations worldwide with competitive prices and excellent customer service!`;
      }

      // Help/support
      if (normalizedQuery.includes('help') || normalizedQuery.includes('support') || normalizedQuery.includes('what can you do') || normalizedQuery.includes('commands') || normalizedQuery.includes('features')) {
        return `I'm here to help with your flight bookings! You can ask me about:\n\n• Flight availability (e.g., 'How many flights from Mumbai?')\n• Your bookings ('How many confirmed tickets do I have?')\n• Passenger details ('Names of passengers in cancelled bookings')\n• Upcoming flights ('When is my next flight?')\n• Membership status ('What type of member am I?')\n• Booking process ('How do I book a flight?')\n• Ticket downloads ('How do I get my ticket?')\n• Cancellation policies ('Can I cancel my booking?')\n• Prices and costs ('How much do flights cost?')\n• Special offers and deals\n\nJust type your question naturally - I'll understand!`;
      }

      // Greetings
      if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
        return `Hello ${user?.firstName || ''}! How can I assist you with your flight booking today?`;
      }

      // Thanks
      if (query.includes('thank') || query.includes('thanks')) {
        return "You're welcome! If you have any more questions, feel free to ask.";
      }

      // Default response with suggestions
      return `I'm not sure about that specific question. You can ask me about:\n\n• Available flights from specific cities (e.g., 'How many flights from Mumbai?')\n• Your booking status and history ('How many confirmed tickets do I have?')\n• Confirmed bookings and passenger details\n• Cancelled bookings and passenger names\n• Your membership type (Prime/Standard)\n• Flight prices and offers\n• How to book flights or download tickets\n• Cancellation policies and procedures\n• General booking help and app features\n\nTry asking me in a more natural way - I'll understand!`;

    } catch (error) {
      console.error('Chatbot error:', error);
      return "Sorry, I'm having trouble processing your request right now. Please try again later or check the relevant pages directly.";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#007bff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}
        onClick={() => setIsOpen(true)}
      >
        <span style={{ color: 'white', fontSize: '24px' }}>💬</span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '350px',
        height: '500px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        border: '1px solid #e0e0e0'
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '15px',
          borderRadius: '10px 10px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span style={{ fontWeight: 'bold' }}>Flight Assistant</span>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: '15px',
          overflowY: 'auto',
          backgroundColor: '#f8f9fa'
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '8px 12px',
                borderRadius: '18px',
                backgroundColor: message.sender === 'user' ? '#007bff' : '#e9ecef',
                color: message.sender === 'user' ? 'white' : '#333',
                wordWrap: 'break-word'
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
            <div
              style={{
                padding: '8px 12px',
                borderRadius: '18px',
                backgroundColor: '#e9ecef',
                color: '#333'
              }}
            >
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: '15px',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          gap: '10px'
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '20px',
            outline: 'none'
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          style={{
            padding: '8px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            opacity: (!input.trim() || isTyping) ? 0.6 : 1
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}