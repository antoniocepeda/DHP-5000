<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <StatsCard
    title="Active Questions"
    value={activeTickets.length}
    description="Awaiting responses"
    icon={Clock}
    color="purple"
  />
  <StatsCard
    title="Answered"
    value={completedTickets.length}
    description="Questions answered"
    icon={CheckCircle}
    color="pink"
  />
  <StatsCard
    title="Messages"
    value={userTickets.reduce((sum, ticket) => sum + (ticket.messages?.length || 0), 0)}
    description="Total interactions"
    icon={MessageSquare}
    color="orange"
  />
</div> 