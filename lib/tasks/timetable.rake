# frozen_string_literal: true

namespace :timetable do
  task main: :environment do
    abort if Time.zone.now >= Time.zone.local(2018, 8, 27)

    dates = {
      Date.new(2018, 8, 25) => 'https://leadi.jp/json/15216.json',
      Date.new(2018, 8, 26) => 'https://leadi.jp/json/15217.json'
    }
    stages = {
      'ストロベリーステージ' => 'strawberry',
      'ブルーベリーステージ' => 'blueberry',
      'キウイステージ'       => 'kiwi',
      'ピーチステージ'       => 'peach',
      'オレンジステージ'     => 'orange',
      'トークステージ'       => 'talk'
    }
    results = []
    dates.each do |date, url|
      open(url) do |f|
        JSON.parse(f.read)['data']['timetables'].each do |e|
          stage = e['stage']
          color = e['color']
          e['turns'].each do |turn|
            artist = turn['lineup'].map { |l| l['name'] }.join('、')
            if artist.blank?
              detail = turn['replacement'].split("\r\n")
              artist = detail.shift
            end
            start_time = Time.zone.strptime("#{date} #{turn['start'].rjust(4, '0')}", '%Y-%m-%d %H%M')
            end_time   = Time.zone.strptime("#{date} #{turn['end'].rjust(4, '0')}",   '%Y-%m-%d %H%M')
            results << {
              id: turn['id'],
              artist: artist,
              detail: detail,
              start: start_time,
              end: end_time,
              stage: stage,
              stage_code: stages[stage],
              color: color
            }
          end
        end
      end
    end
    results.sort_by!.with_index { |v, i| [v[:start], i] }
    Rails.cache.write('main', results)
  end
end
