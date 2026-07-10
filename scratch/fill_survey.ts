const BASE_URL = 'https://surveilab-v1.vercel.app'

async function fillSurvey() {
  console.log('Starting survey simulation on:', BASE_URL)

  // 1. Create Session
  console.log('\n[1/5] Creating survey session...')
  const createRes = await fetch(`${BASE_URL}/api/sessions`, {
    method: 'POST',
    headers: {
      'User-Agent': 'Antigravity AI Agent Simulation (Windows Node)',
      'Referer': BASE_URL,
    }
  })
  const createData = (await createRes.json()) as any
  if (!createRes.ok || !createData.success) {
    throw new Error(`Failed to create session: ${JSON.stringify(createData)}`)
  }
  const sessionId = createData.data.sessionId
  console.log(`Session Created! ID: ${sessionId}`)

  // 2. Submit Profile
  console.log('\n[2/5] Submitting respondent profile...')
  const profile = {
    ageRange: 'AGE_25_34',
    occupation: 'ENTREPRENEUR',
    location: 'DKI Jakarta',
    techSavviness: 4,
  }
  const profileRes = await fetch(`${BASE_URL}/api/sessions/${sessionId}/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  })
  const profileData = (await profileRes.json()) as any
  if (!profileRes.ok || !profileData.success) {
    throw new Error(`Failed to save profile: ${JSON.stringify(profileData)}`)
  }
  console.log('Profile saved successfully!')

  // 3. Submit responses for all 5 ideas
  console.log('\n[3/5] Submitting evaluations for 5 ideas...')
  const ideas = ['1', '2', '3', '4', '5']
  for (const ideaId of ideas) {
    const responseBody = {
      ideaId,
      problemSeverity: 4,
      usefulness: 5,
      urgency: 4,
      experienceType: 'PERSONAL',
      usageIntent: 'DEFINITELY_YES',
      npsScore: 9,
      conceptClarity: 'VERY_HELPFUL',
    }
    const responseRes = await fetch(`${BASE_URL}/api/sessions/${sessionId}/responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(responseBody),
    })
    const responseData = (await responseRes.json()) as any
    if (!responseRes.ok || !responseData.success) {
      throw new Error(`Failed to save response for Idea ${ideaId}: ${JSON.stringify(responseData)}`)
    }
    console.log(`Saved evaluation for Idea ${ideaId} (Next Step: ${responseData.data.nextStep})`)
  }

  // 4. Submit Final Choice
  console.log('\n[4/5] Submitting final choice...')
  const finalChoice = {
    firstChoiceId: '1',
    secondChoiceId: '4',
    reason: 'Sebagai wirausahawan, saya melihat Produsen Nusantara dan ExportHub memiliki potensi pasar terbesar dan langsung membantu rantai pasok lokal.',
  }
  const choiceRes = await fetch(`${BASE_URL}/api/sessions/${sessionId}/final-choice`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(finalChoice),
  })
  const choiceData = (await choiceRes.json()) as any
  if (!choiceRes.ok || !choiceData.success) {
    throw new Error(`Failed to save final choice: ${JSON.stringify(choiceData)}`)
  }
  console.log('Final choice submitted successfully!')

  // 5. Submit Feedback
  console.log('\n[5/5] Submitting open feedback & finishing...')
  const feedback = {
    mostImportantFeature: 'Integrasi sistem logistik terpercaya dan asuransi pengiriman.',
    biggestConcern: 'Keamanan transaksi dan verifikasi profil penjual/pembeli.',
    otherIdeas: 'Platform agregasi kurir lokal dengan tarif flat untuk UMKM desa.',
  }
  const feedbackRes = await fetch(`${BASE_URL}/api/sessions/${sessionId}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  })
  const feedbackData = (await feedbackRes.json()) as any
  if (!feedbackRes.ok || !feedbackData.success) {
    throw new Error(`Failed to save feedback: ${JSON.stringify(feedbackData)}`)
  }
  console.log('Feedback submitted! Survey completed successfully!')
  console.log('\n🎉 ALL DONE! Check your Vercel admin dashboard to see this response.')
}

fillSurvey().catch(console.error)
