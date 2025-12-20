import bcryptjs from 'bcryptjs';

/**
 * Admin Credential Generator
 * Use this script to generate hashed passwords for admin users
 * 
 * Run with: npx ts-node src/lib/generateAdminPassword.ts
 */

async function generateAdminPassword(password: string): Promise<string> {
  const saltRounds = 12;
  const hashedPassword = await bcryptjs.hash(password, saltRounds);
  return hashedPassword;
}

async function main() {
  // Example: Generate hash for password "Admin@123"
  const examplePassword = process.argv[2] || 'Admin@123';
  
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║          ADMIN PASSWORD HASH GENERATOR                  ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');
  
  console.log(`📝 Password: ${examplePassword}`);
  console.log('🔄 Generating bcrypt hash (12 rounds)...\n');
  
  try {
    const hashedPassword = await generateAdminPassword(examplePassword);
    
    console.log('✅ Hash Generated Successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n📌 Hashed Password:\n${hashedPassword}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('📋 SQL INSERT Statement:\n');
    console.log(`INSERT INTO admin_users (username, password_hash, email, is_active)`);
    console.log(`VALUES (`);
    console.log(`  'admin',`);
    console.log(`  '${hashedPassword}',`);
    console.log(`  'admin@rehas.com',`);
    console.log(`  true`);
    console.log(`);\n`);
    
    console.log('⚠️  SECURITY NOTES:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✓ Hashes are unique each time (salt is included)');
    console.log('✓ Never store plain text passwords');
    console.log('✓ Use strong passwords (min 12 characters recommended)');
    console.log('✓ Bcryptjs automatically handles salt generation');
    console.log('✓ Always use HTTPS in production\n');
    
  } catch (error) {
    console.error('❌ Error generating hash:', error);
  }
}

main();
