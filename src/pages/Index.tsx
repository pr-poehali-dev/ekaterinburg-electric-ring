import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const stations = [
  { id: 1, name: 'Екатеринбург-Пассажирский', angle: 0, distance: 42, image: 'https://cdn.poehali.dev/projects/558d902a-9ea9-4b4a-bb10-b9d122cf9d26/files/52b3c68e-4c05-49a4-87fb-c19cd0eed5b1.jpg', description: 'Главная станция города с развитой инфраструктурой' },
  { id: 2, name: 'Шарташ', angle: 36, distance: 38, image: 'https://cdn.poehali.dev/projects/558d902a-9ea9-4b4a-bb10-b9d122cf9d26/files/f3f8a153-d835-411f-831a-206cab7c431c.jpg', description: 'Станция в жилом районе рядом с озером' },
  { id: 3, name: 'Керамик', angle: 72, distance: 42, image: 'https://cdn.poehali.dev/projects/558d902a-9ea9-4b4a-bb10-b9d122cf9d26/files/1153edc2-bb2b-44b4-b688-fc9242860970.jpg', description: 'Современная станция в промышленной зоне' },
  { id: 4, name: 'Первомайская', angle: 108, distance: 38, image: 'https://cdn.poehali.dev/projects/558d902a-9ea9-4b4a-bb10-b9d122cf9d26/files/52b3c68e-4c05-49a4-87fb-c19cd0eed5b1.jpg', description: 'Центральная транспортная развязка' },
  { id: 5, name: 'Медный', angle: 144, distance: 42, image: 'https://cdn.poehali.dev/projects/558d902a-9ea9-4b4a-bb10-b9d122cf9d26/files/f3f8a153-d835-411f-831a-206cab7c431c.jpg', description: 'Тихая станция в спальном районе' },
  { id: 6, name: 'Калиновская', angle: 180, distance: 38, image: 'https://cdn.poehali.dev/projects/558d902a-9ea9-4b4a-bb10-b9d122cf9d26/files/1153edc2-bb2b-44b4-b688-fc9242860970.jpg', description: 'Станция с удобной парковкой' },
  { id: 7, name: 'Уралмаш', angle: 216, distance: 42, image: 'https://cdn.poehali.dev/projects/558d902a-9ea9-4b4a-bb10-b9d122cf9d26/files/52b3c68e-4c05-49a4-87fb-c19cd0eed5b1.jpg', description: 'Исторический район с заводами' },
  { id: 8, name: 'Химмаш', angle: 252, distance: 38, image: 'https://cdn.poehali.dev/projects/558d902a-9ea9-4b4a-bb10-b9d122cf9d26/files/f3f8a153-d835-411f-831a-206cab7c431c.jpg', description: 'Промышленная зона города' },
  { id: 9, name: 'Елизавет', angle: 288, distance: 42, image: 'https://cdn.poehali.dev/projects/558d902a-9ea9-4b4a-bb10-b9d122cf9d26/files/1153edc2-bb2b-44b4-b688-fc9242860970.jpg', description: 'Старинная часть Екатеринбурга' },
  { id: 10, name: 'Компрессорный', angle: 324, distance: 38, image: 'https://cdn.poehali.dev/projects/558d902a-9ea9-4b4a-bb10-b9d122cf9d26/files/52b3c68e-4c05-49a4-87fb-c19cd0eed5b1.jpg', description: 'Новая станция с парком' }
];

const scheduleData = [
  { time: '06:00', direction: 'По часовой', status: 'active' },
  { time: '06:30', direction: 'Против часовой', status: 'active' },
  { time: '07:00', direction: 'По часовой', status: 'active' },
  { time: '07:30', direction: 'Против часовой', status: 'active' },
  { time: '08:00', direction: 'По часовой', status: 'active' },
];

const tariffs = [
  { zone: 'Одна зона', price: '35 ₽', trips: 'До 3 станций' },
  { zone: 'Две зоны', price: '50 ₽', trips: '4-6 станций' },
  { zone: 'Полный круг', price: '70 ₽', trips: 'Все станции' },
  { zone: 'Абонемент (месяц)', price: '1800 ₽', trips: 'Безлимит' }
];

const Index = () => {
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('main');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Train" size={32} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">ЕГЭК</h1>
                <p className="text-xs text-slate-600">Екатеринбургская городская электричка</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <Button variant="ghost" onClick={() => setActiveTab('main')}>Главная</Button>
              <Button variant="ghost" onClick={() => setActiveTab('route')}>Маршрут</Button>
              <Button variant="ghost" onClick={() => setActiveTab('schedule')}>Расписание</Button>
              <Button variant="ghost" onClick={() => setActiveTab('tariffs')}>Тарифы</Button>
            </nav>
            <Button className="md:hidden" variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="hidden">
            <TabsTrigger value="main">Главная</TabsTrigger>
            <TabsTrigger value="route">Маршрут</TabsTrigger>
            <TabsTrigger value="schedule">Расписание</TabsTrigger>
            <TabsTrigger value="tariffs">Тарифы</TabsTrigger>
          </TabsList>

          <TabsContent value="main" className="space-y-8 animate-fade-in">
            <section className="text-center py-12">
              <h2 className="text-5xl font-bold text-slate-900 mb-4">
                Кольцевая электричка Екатеринбурга
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                Современный городской транспорт, соединяющий все районы города по кольцевому маршруту
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" onClick={() => setActiveTab('route')}>
                  <Icon name="Map" className="mr-2" size={20} />
                  Посмотреть маршрут
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveTab('schedule')}>
                  <Icon name="Clock" className="mr-2" size={20} />
                  Расписание
                </Button>
              </div>
            </section>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">10 станций</h3>
                    <p className="text-slate-600">Охватывает все районы города по кольцевому маршруту</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name="Clock" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Каждые 30 минут</h3>
                    <p className="text-slate-600">Регулярное движение в обоих направлениях</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name="Zap" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">90 минут</h3>
                    <p className="text-slate-600">Полный круг по всему маршруту</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="route" className="animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Интерактивная карта маршрута</h2>
                <div className="relative aspect-square bg-white rounded-2xl shadow-xl p-8 overflow-hidden">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <circle
                      cx="200"
                      cy="200"
                      r="140"
                      fill="none"
                      stroke="#0EA5E9"
                      strokeWidth="4"
                      className="opacity-30"
                    />
                    
                    <circle
                      cx="200"
                      cy="200"
                      r="140"
                      fill="none"
                      stroke="#0EA5E9"
                      strokeWidth="6"
                      strokeDasharray="8 4"
                    />

                    {stations.map((station) => {
                      const angle = (station.angle * Math.PI) / 180;
                      const x = 200 + station.distance * 3 * Math.cos(angle - Math.PI / 2);
                      const y = 200 + station.distance * 3 * Math.sin(angle - Math.PI / 2);
                      const isSelected = selectedStation === station.id;

                      return (
                        <g key={station.id}>
                          <circle
                            cx={x}
                            cy={y}
                            r={isSelected ? "14" : "10"}
                            fill={isSelected ? "#0EA5E9" : "white"}
                            stroke="#0EA5E9"
                            strokeWidth="3"
                            className="cursor-pointer transition-all hover:scale-110"
                            onClick={() => setSelectedStation(station.id)}
                          />
                          {isSelected && (
                            <circle
                              cx={x}
                              cy={y}
                              r="18"
                              fill="none"
                              stroke="#0EA5E9"
                              strokeWidth="2"
                              className="animate-pulse-ring"
                            />
                          )}
                        </g>
                      );
                    })}

                    <circle cx="200" cy="200" r="8" fill="#1A1F2C" />
                    <text x="200" y="215" textAnchor="middle" className="text-xs fill-slate-600">
                      Центр
                    </text>
                  </svg>

                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-slate-700">Активная станция</span>
                      <div className="w-3 h-3 rounded-full bg-white border-2 border-primary ml-4"></div>
                      <span className="text-slate-700">Станция</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Станции маршрута</h3>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {stations.map((station) => (
                    <Card
                      key={station.id}
                      className={`cursor-pointer transition-all hover:shadow-md overflow-hidden ${
                        selectedStation === station.id ? 'border-primary border-2 bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedStation(station.id)}
                    >
                      <div className="flex gap-4">
                        <img 
                          src={station.image} 
                          alt={station.name}
                          className="w-24 h-24 object-cover flex-shrink-0"
                        />
                        <div className="flex-1 p-4 flex items-center justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                              selectedStation === station.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {station.id}
                            </div>
                            <div>
                              <div className="font-medium mb-1">{station.name}</div>
                              <p className="text-sm text-slate-600">{station.description}</p>
                            </div>
                          </div>
                          <Icon name="ChevronRight" size={20} className="text-slate-400 flex-shrink-0" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Расписание движения</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="ArrowRight" size={24} className="text-primary" />
                    <h3 className="text-xl font-semibold">По часовой стрелке</h3>
                  </div>
                  <p className="text-slate-600 mb-4">Первый рейс: 06:00 | Последний рейс: 23:00</p>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="Clock" size={16} />
                    <span>Интервал движения: 30 минут</span>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="ArrowLeft" size={24} className="text-primary" />
                    <h3 className="text-xl font-semibold">Против часовой стрелки</h3>
                  </div>
                  <p className="text-slate-600 mb-4">Первый рейс: 06:30 | Последний рейс: 23:30</p>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="Clock" size={16} />
                    <span>Интервал движения: 30 минут</span>
                  </div>
                </Card>
              </div>

              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Время</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Направление</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Статус</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {scheduleData.map((item, index) => (
                        <tr key={index} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium">{item.time}</td>
                          <td className="px-6 py-4">{item.direction}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              Активный
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tariffs" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Тарифы и стоимость проезда</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {tariffs.map((tariff, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{tariff.zone}</h3>
                        <p className="text-slate-600">{tariff.trips}</p>
                      </div>
                      <div className="text-3xl font-bold text-primary">{tariff.price}</div>
                    </div>
                    <Button className="w-full">
                      <Icon name="Ticket" className="mr-2" size={18} />
                      Купить билет
                    </Button>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
                <div className="flex gap-4">
                  <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Льготы и скидки</h4>
                    <ul className="space-y-1 text-sm text-slate-700">
                      <li>• Пенсионеры и студенты: скидка 50%</li>
                      <li>• Дети до 7 лет: бесплатный проезд</li>
                      <li>• Школьники: скидка 30%</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-slate-900 text-white mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">ЕГЭК</h4>
              <p className="text-slate-400 text-sm">
                Екатеринбургская городская электричка — современный общественный транспорт
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>8 (343) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@egek.ru</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Режим работы</h4>
              <p className="text-slate-400 text-sm">
                Ежедневно с 06:00 до 00:00
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-6 text-center text-sm text-slate-400">
            © 2024 ЕГЭК. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;