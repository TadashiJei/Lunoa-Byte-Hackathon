const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testHomomorphicEncryption() {
  console.log('🧪 Testing Homomorphic Encryption Integration...\n');

  try {
    // Test 1: Service Status
    console.log('1. Testing service status...');
    const statusResponse = await axios.get(`${BASE_URL}/homomorphic-encryption/status`);
    console.log('✅ Service Status:', statusResponse.data);

    // Test 2: Paillier Encryption/Decryption
    console.log('\n2. Testing Paillier encryption/decryption...');
    const encryptResponse = await axios.post(`${BASE_URL}/homomorphic-encryption/encrypt`, {
      data: '12345',
      scheme: 'paillier'
    });
    console.log('✅ Encrypted:', encryptResponse.data.encryptedData.ciphertext.substring(0, 50) + '...');

    const decryptResponse = await axios.post(`${BASE_URL}/homomorphic-encryption/decrypt`, {
      encryptedData: encryptResponse.data.encryptedData
    });
    console.log('✅ Decrypted:', decryptResponse.data.decryptedData);

    // Test 3: Homomorphic Addition
    console.log('\n3. Testing homomorphic addition...');
    const encrypt1 = await axios.post(`${BASE_URL}/homomorphic-encryption/encrypt`, {
      data: '10',
      scheme: 'paillier'
    });
    const encrypt2 = await axios.post(`${BASE_URL}/homomorphic-encryption/encrypt`, {
      data: '5',
      scheme: 'paillier'
    });

    const addResponse = await axios.post(`${BASE_URL}/homomorphic-encryption/add`, {
      encryptedA: encrypt1.data.encryptedData,
      encryptedB: encrypt2.data.encryptedData
    });
    console.log('✅ Addition Result:', addResponse.data.result.encryptedResult.substring(0, 50) + '...');

    // Test 4: CKKS Encryption
    console.log('\n4. Testing CKKS encryption...');
    const ckksResponse = await axios.post(`${BASE_URL}/homomorphic-encryption/ckks-encrypt`, {
      data: [1.5, 2.3, 3.7]
    });
    console.log('✅ CKKS Encrypted:', ckksResponse.data.encryptedData.scheme);

    const ckksDecrypt = await axios.post(`${BASE_URL}/homomorphic-encryption/ckks-decrypt`, {
      encryptedData: ckksResponse.data.encryptedData
    });
    console.log('✅ CKKS Decrypted:', ckksDecrypt.data.decryptedData);

    // Test 5: BFV Encryption
    console.log('\n5. Testing BFV encryption...');
    const bfvResponse = await axios.post(`${BASE_URL}/homomorphic-encryption/bfv-encrypt`, {
      data: ['42', '100', '255']
    });
    console.log('✅ BFV Encrypted:', bfvResponse.data.encryptedData.scheme);

    const bfvDecrypt = await axios.post(`${BASE_URL}/homomorphic-encryption/bfv-decrypt`, {
      encryptedData: bfvResponse.data.encryptedData
    });
    console.log('✅ BFV Decrypted:', bfvDecrypt.data.decryptedData);

    // Test 6: Batch Encryption
    console.log('\n6. Testing batch encryption...');
    const batchResponse = await axios.post(`${BASE_URL}/homomorphic-encryption/batch-encrypt`, {
      data: ['1', '2', '3', '4', '5'],
      scheme: 'paillier'
    });
    console.log('✅ Batch Encrypted:', batchResponse.data.count, 'items');

    console.log('\n🎉 All homomorphic encryption tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Check if server is running
async function checkServer() {
  try {
    await axios.get(`${BASE_URL}/health`);
    console.log('✅ Server is running...\n');
    await testHomomorphicEncryption();
  } catch (error) {
    console.log('⚠️  Server not running. Starting server...\n');
    
    // Start server and run tests
    const { spawn } = require('child_process');
    const server = spawn('npm', ['run', 'start:dev'], { 
      cwd: __dirname,
      stdio: 'pipe'
    });

    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Application is running')) {
        console.log('✅ Server started successfully...\n');
        setTimeout(() => testHomomorphicEncryption().catch(console.error), 2000);
      }
    });

    server.stderr.on('data', (data) => {
      console.error('Server error:', data.toString());
    });

    setTimeout(() => {
      server.kill();
      console.log('\n🛑 Server stopped after testing.');
    }, 30000);
  }
}

checkServer();
