import { Heading, Text } from '@ktbiotech/system-design';

export default function ColorTest() {
  return (
    <div className="p-8 space-y-6">
      <Heading level={1} className="text-kt-blue-800">
        KTBioTech Color Test
      </Heading>
      
      {/* Primary Colors */}
      <div className="space-y-4">
        <Heading level={2} className="text-kt-gray-800">
          Primary Brand Colors
        </Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-kt-blue-50 p-4 rounded-lg border border-kt-gray-200">
            <Text className="text-kt-blue-800 font-semibold">kt-blue-50</Text>
            <Text className="text-kt-gray-500 text-sm">#eff6ff</Text>
          </div>
          <div className="bg-kt-blue-100 p-4 rounded-lg border border-kt-gray-200">
            <Text className="text-kt-blue-800 font-semibold">kt-blue-100</Text>
            <Text className="text-kt-gray-500 text-sm">#dbeafe</Text>
          </div>
          <div className="bg-kt-blue-500 p-4 rounded-lg border border-kt-gray-200">
            <Text className="text-white font-semibold">kt-blue-500</Text>
            <Text className="text-kt-blue-100 text-sm">#3b82f6</Text>
          </div>
          <div className="bg-kt-blue-800 p-4 rounded-lg border border-kt-gray-200">
            <Text className="text-white font-semibold">kt-blue-800</Text>
            <Text className="text-kt-blue-100 text-sm">#1e40af</Text>
          </div>
        </div>
      </div>

      {/* Gray Scale */}
      <div className="space-y-4">
        <Heading level={2} className="text-kt-gray-800">
          Gray Scale
        </Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-kt-gray-50 p-4 rounded-lg border border-kt-gray-200">
            <Text className="text-kt-gray-800 font-semibold">kt-gray-50</Text>
            <Text className="text-kt-gray-500 text-sm">#f9fafb</Text>
          </div>
          <div className="bg-kt-gray-100 p-4 rounded-lg border border-kt-gray-200">
            <Text className="text-kt-gray-800 font-semibold">kt-gray-100</Text>
            <Text className="text-kt-gray-500 text-sm">#f3f4f6</Text>
          </div>
          <div className="bg-kt-gray-500 p-4 rounded-lg border border-kt-gray-200">
            <Text className="text-white font-semibold">kt-gray-500</Text>
            <Text className="text-kt-gray-100 text-sm">#6b7280</Text>
          </div>
          <div className="bg-kt-gray-800 p-4 rounded-lg border border-kt-gray-200">
            <Text className="text-white font-semibold">kt-gray-800</Text>
            <Text className="text-kt-gray-100 text-sm">#1f2937</Text>
          </div>
        </div>
      </div>

      {/* Footer Colors */}
      <div className="space-y-4">
        <Heading level={2} className="text-kt-gray-800">
          Footer Colors
        </Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-kt-footer-50 p-4 rounded-lg border border-kt-gray-200">
            <Text className="text-kt-footer-800 font-semibold">kt-footer-50</Text>
            <Text className="text-kt-gray-500 text-sm">#f8fafc</Text>
          </div>
          <div className="bg-kt-footer-200 p-4 rounded-lg border border-kt-gray-200">
            <Text className="text-kt-footer-800 font-semibold">kt-footer-200</Text>
            <Text className="text-kt-gray-500 text-sm">#e2e8f0</Text>
          </div>
          <div className="bg-kt-footer-500 p-4 rounded-lg border border-kt-gray-200">
            <Text className="text-white font-semibold">kt-footer-500</Text>
            <Text className="text-kt-footer-100 text-sm">#64748b</Text>
          </div>
          <div className="bg-kt-footer-800 p-4 rounded-lg border border-kt-gray-200">
            <Text className="text-kt-footer-200 font-semibold">kt-footer-800</Text>
            <Text className="text-kt-footer-400 text-sm">#1e293b</Text>
          </div>
        </div>
      </div>

      {/* Semantic Colors */}
      <div className="space-y-4">
        <Heading level={2} className="text-kt-gray-800">
          Semantic Colors
        </Heading>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-kt-primary p-4 rounded-lg">
            <Text className="text-white font-semibold">kt-primary</Text>
            <Text className="text-kt-blue-100 text-sm">Primary Brand</Text>
          </div>
          <div className="bg-kt-success p-4 rounded-lg">
            <Text className="text-white font-semibold">kt-success</Text>
            <Text className="text-green-100 text-sm">Success State</Text>
          </div>
          <div className="bg-kt-warning p-4 rounded-lg">
            <Text className="text-white font-semibold">kt-warning</Text>
            <Text className="text-yellow-100 text-sm">Warning State</Text>
          </div>
        </div>
      </div>

      {/* Interactive States */}
      <div className="space-y-4">
        <Heading level={2} className="text-kt-gray-800">
          Interactive States
        </Heading>
        <div className="flex flex-wrap gap-4">
          <button className="bg-kt-blue-800 text-white px-6 py-3 rounded-lg hover:bg-kt-blue-700 transition-colors">
            Primary Button
          </button>
          <button className="bg-kt-gray-100 text-kt-gray-800 px-6 py-3 rounded-lg hover:bg-kt-gray-200 transition-colors">
            Secondary Button
          </button>
          <a href="#" className="text-kt-blue-600 hover:text-kt-blue-700 transition-colors underline">
            Link with Hover
          </a>
        </div>
      </div>

      {/* CSS Variables Test */}
      <div className="space-y-4">
        <Heading level={2} className="text-kt-gray-800">
          CSS Variables Test
        </Heading>
        <div className="bg-white border border-kt-gray-200 rounded-lg p-6">
          <div className="kt-text-primary kt-bg-secondary kt-border-light kt-transition-colors p-4 rounded">
            <Text className="font-semibold">CSS Variables Working!</Text>
            <Text className="kt-text-secondary">This uses CSS variables for consistent styling.</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
