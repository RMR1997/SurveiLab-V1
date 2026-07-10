import { prisma } from '../src/lib/prisma'

async function main() {
  console.log('Querying database...')
  
  const sessions = await prisma.surveySession.findMany()
  console.log('Total Sessions in DB:', sessions.length)
  console.log('Sessions:', sessions)

  const profiles = await prisma.respondentProfile.findMany()
  console.log('Total Profiles in DB:', profiles.length)
  console.log('Profiles:', profiles)

  const responses = await prisma.ideaResponse.findMany()
  console.log('Total Responses in DB:', responses.length)
  console.log('Responses:', responses)

  const choices = await prisma.finalChoice.findMany()
  console.log('Total Choices in DB:', choices.length)

  const ideas = await prisma.startupIdea.findMany()
  console.log('Total Ideas in DB:', ideas.length)
  console.log('Ideas in DB:', ideas.map(i => ({ id: i.id, slug: i.slug, name: i.name })))
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
