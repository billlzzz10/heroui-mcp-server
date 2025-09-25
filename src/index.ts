import { toolRegistry } from './server/registry';
import { crud } from './objects/crud';
import { sessionManager } from './memory/session-manager';

console.log('🚀 HeroUI MCP Server Starting...');

// Display server info
console.log(`📊 Total Tools Registered: ${toolRegistry.getAllTools().length}`);
console.log(`💾 CRUD System: Ready`);
console.log(`🧠 Session Manager: Ready`);

// Test creating a color palette
async function testColorPalette() {
  console.log('\n🎨 Testing Color Palette Creation...');
  
  const colorTool = toolRegistry.getTool('HERO_GEN_DEFINE_COLOR_01');
  if (colorTool) {
    try {
      const result = await colorTool.execute({
        name: 'Test Palette',
        generationMethod: 'manual',
        baseColor: '#3B82F6',
        palette: {
          primary: '#3B82F6',
          secondary: '#10B981',
          accent: '#F59E0B',
          neutral: '#6B7280'
        },
        semantic: {
          background: '#FFFFFF',
          surface: '#F9FAFB',
          text: {
            primary: '#111827',
            secondary: '#6B7280',
            disabled: '#9CA3AF'
          },
          border: {
            default: '#D1D5DB',
            subtle: '#E5E7EB'
          },
          feedback: {
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444'
          }
        },
        metadata: {
          tags: ['demo', 'blue'],
          suitability: {
            lightMode: true,
            darkMode: false,
            highContrast: true
          }
        }
      });
      
      console.log(`✅ Color Palette Created: ${result.hash}`);
      console.log(`📝 Name: ${result.object.name}`);
      console.log(`🎯 Base Color: ${result.object.baseColor}`);
    } catch (error) {
      console.error('❌ Error creating color palette:', error);
    }
  }
}

// Test session management
function testSessionManager() {
  console.log('\n🧠 Testing Session Management...');
  
  const session = sessionManager.createSession({ userType: 'demo' });
  console.log(`✅ Session Created: ${session.id}`);
  
  sessionManager.updateSessionContext(session.id, {
    action: 'color_palette_created',
    timestamp: new Date().toISOString()
  });
  
  const retrievedSession = sessionManager.getSession(session.id);
  console.log(`📊 Session Context Length: ${retrievedSession?.context.length}`);
}

// Test component tool
async function testComponentTool() {
  console.log('\n🧩 Testing Component Tool...');
  
  const buttonTool = toolRegistry.getTool('HERO_COMP_BUTTON_01');
  if (buttonTool) {
    try {
      const result = await buttonTool.execute({
        name: 'Primary Button',
        props: {
          variant: 'solid',
          color: 'primary',
          size: 'md'
        },
        metadata: {
          tags: ['button', 'primary']
        }
      });
      
      console.log(`✅ Button Component Created: ${result.hash}`);
      console.log(`🎯 Target: ${result.object.targetComponent}`);
    } catch (error) {
      console.error('❌ Error creating button:', error);
    }
  }
}

// Run tests
async function runDemo() {
  await testColorPalette();
  testSessionManager();
  await testComponentTool();
  
  // Show final stats
  console.log('\n📈 Final Statistics:');
  console.log(`🗃️  Total Objects in CRUD: ${crud.list().length}`);
  console.log(`🛠️  Available Tools: ${toolRegistry.getAllTools().length}`);
  
  console.log('\n✨ HeroUI MCP Server Demo Complete!');
}

runDemo().catch(console.error);