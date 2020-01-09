import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ticketService } from '../../services/TicketService';

interface TicketSummaryProps {
  tickets: any;
  quantities: any;
  totalPrice: number;
}

const TicketSummary = (props: TicketSummaryProps) => {
  return <div>{}</div>;
};

export default TicketSummary;
